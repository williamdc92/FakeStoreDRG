import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RootObject, ShopService } from 'src/app/service/Shop-service/shop-service.service';
import { Storage } from '@ionic/storage-angular';
import { UserService, CartElement, Me, orders } from './service/UserService/user-service';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})



export class AppComponent {
  public appPages = [
    { title: 'Wishlist', url: '/wishlist', icon: 'heart' },
    { title: 'Order History', url: '/order-history', icon: 'archive' }
  ];
  
  
  
  
  constructor(private menu: MenuController, public router: Router, public service: ShopService, private storage: Storage, public userService: UserService, public toastController: ToastController) {
  }
  
  public producers = []
  public categories = [];
  database: RootObject[];
  cart: CartElement[];
  currentUser: Me;

  isEmpty = true; 
  isAdmin: boolean;
  total: number = 0;
  
  
  async ngOnInit() {
    await this.storage.create();
    this.database = await this.service.GetDatabase();
    this.GetProducerCategory()

    await this.GetUser();
    await this.GetCart()
    
    
  }
  
  
  Refresh = async () => {
    
    if (this.service.datachange == true) {
      this.database = await this.service.GetDatabase();
      this.GetProducerCategory()
      this.service.datachange = false;
    }

    if (this.service.cartchange == true) {
      await this.GetCart()
      this.service.cartchange = false
    }
    
    if (this.userService.cartfirstcheck == true) {
      await this.GetCart()
      this.userService.cartfirstcheck = false;
    }
    
    
    if (this.userService.userfirstcheck ==true) {
     await this.GetUser(); 
     this.userService.userfirstcheck = false;
    }
    
    
    
  }
  
  GetProducerCategory = () => {
    this.producers = this.database.map((item: { producer: string; }) => item.producer).filter((item, pos, self) => { return self.indexOf(item) == pos; });
    this.categories = this.database.map((item: { category: string; }) => item.category).filter((item, pos, self) => { return self.indexOf(item) == pos; });
  }
  
  openEnd = () => {this.menu.close()}
  
  
  GetUser = async () => {
    
    if (await this.storage.get('logged') === true) {
      try {
        this.currentUser = await this.userService.GetMe(await this.storage.get('token'));
        this.isAdmin = this.currentUser?.isAdmin;
      }
      
      
      catch (err) {
        console.log(err)
        const toast = await this.toastController.create({
          message: `Section expired, please log in again`,
          duration: 2000
        });
        toast.present();
        this.LogOut();
      }
    }
  }
  
  LogOut = async () => {
    await this.storage.set('logged', false);
    await this.storage.set('viewed', false);
    await this.storage.set('email', "");
    await this.storage.set('token', "");
    await this.storage.set('id', "");
    
    this.userService.activeSessions = false;
    await this.router.navigate(['tutorial'])
  }
  
  
  GetCart = async () => {
    if (await this.storage.get('logged') === true) {
      try {

        this.isEmpty = false;
        this.cart = await this.userService.GetCart(await this.storage.get('id'));
        this.total = this.cart.map(item => item.tot).reduce((sum, item) => sum + item)
      }
      
      catch {
        this.isEmpty = true;
        
      }
    }
  }
  
  RemoveFromCart = async (idp: string) => {
    try {
      await this.userService.RemoveProductFromCart(await this.storage.get('id'), idp);
      await this.ngOnInit();
      const toast = await this.toastController.create({
        message: `Product removed from cart`,
        duration: 2000
      });
      toast.present();
      this.service.cartchange = true;
      this.Refresh();
      
    }
    
    catch (err) {
      const toast = await this.toastController.create({
        message: `Cannot remove product from cart. Please try again`,
        duration: 2000
      });
      toast.present();
      
    }
    
  }
  
  PlaceOrder = async () => {
    
    const order: orders = {
      date: new Date,
      total: this.total,
      items: this.cart,
      id: ""
    }
    
    try {
      await this.userService.AddOrder((await this.storage.get('id')), order, (await this.storage.get('token')))
      const toast = await this.toastController.create({
        message: 'Order send successfully!',
        duration: 2000
      });
      toast.present();
      this.service.cartchange = true;
      this.Refresh();
      this.openEnd();
      this.total = 0;
    }
    
    catch (err) {
      const toast = await this.toastController.create({
        message: `Sorry, can't place order`,
        duration: 2000
      });
      toast.present();
      console.log(err);
    }
  }
  
  IncreaseQuantity = async (idp: string) => {
    
    try {
      await this.userService.IncreaseQuantity(await this.storage.get('id'), idp)
      this.service.cartchange = true;
      this.Refresh();
    }
    
    catch (err) {
      const toast = await this.toastController.create({
        message: `Sorry, can't add element. Please try again later`,
        duration: 2000
      });
      toast.present();
      console.log(err);
    }
  }
  
  DecreaseQuantity = async (idp: string) => {
    
    try {
      await this.userService.DecreaseQuantity(await this.storage.get('id'), idp)
      this.service.cartchange = true;
      this.Refresh();
    }
    
    catch (err) {
      const toast = await this.toastController.create({
        message: `Sorry, can't remove element. Please try again later`,
        duration: 2000
      });
      toast.present();
      console.log(err);
    }
  }
  
  
}
