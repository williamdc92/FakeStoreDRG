import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RootObject, ShopService } from 'src/app/service/Shop-service/shop-service.service';
import { Storage } from '@ionic/storage-angular';
import { UserService, CartElement, Me, orders } from './service/UserService/user-service';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

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




  constructor(private screenOrientation: ScreenOrientation, private menu: MenuController, public router: Router, public service: ShopService, private storage: Storage, public userService: UserService, public toastController: ToastController) {
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

    try {
      await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }

    catch {
      console.log(" Rotation: Not in a mobile device")
    }

    try {

      await this.storage.create();
      this.database = await this.service.getDatabase();
      this.getProducerCategory()

      await this.getUser();
      await this.getCart()
    }

    catch (err) {
      console.log(err)
    }




  }


  refresh = async () => {

    try {
      this.total = this.cart.map(item => item.tot).reduce((sum, item) => sum + item)
      this.isEmpty = false;
    }

    catch (err) {
      console.log(err)
    }


    if (this.service.datachange == true) {
      this.database = await this.service.getDatabase();
      this.getProducerCategory()
      this.service.datachange = false;
    }

    if (this.service.cartchange == true) {
      await this.getCart()
      this.service.cartchange = false
    }

    if (this.userService.cartfirstcheck == true) {
      await this.getCart()
      this.userService.cartfirstcheck = false;
    }


    if (this.userService.userfirstcheck == true) {
      await this.getUser();
      this.userService.userfirstcheck = false;
    }



  }

  getProducerCategory = () => {
    this.producers = this.database.map((item: { producer: string; }) => item.producer).filter((item, pos, self) => { return self.indexOf(item) == pos; });
    this.categories = this.database.map((item: { category: string; }) => item.category).filter((item, pos, self) => { return self.indexOf(item) == pos; });
  }

  openEnd = () => { this.menu.close() }


  getUser = async () => {

    if (await this.storage.get('logged') === true) {
      try {
        this.currentUser = await this.userService.getMe(await this.storage.get('token'));
        this.isAdmin = this.currentUser?.isAdmin;
      }


      catch (err) {
        console.log(err)
        const toast = await this.toastController.create({
          message: `Section expired, please log in again`,
          duration: 2000
        });
        toast.present();
        this.logOut();
      }
    }
  }

  logOut = async () => {
    await this.storage.set('logged', false);
    await this.storage.set('viewed', false);
    await this.storage.set('email', "");
    await this.storage.set('token', "");
    await this.storage.set('id', "");

    this.userService.activeSessions = false;
    await this.router.navigate(['tutorial'])
  }


  getCart = async () => {
    if (await this.storage.get('logged') === true) {
      try {

        this.isEmpty = false;
        this.cart = await this.userService.getCart(await this.storage.get('id'));
        this.total = this.cart.map(item => item.tot).reduce((sum, item) => sum + item)
      }

      catch {
        this.isEmpty = true;

      }
    }
  }

  RemoveFromCart = async (idp: string) => {
    try {
      await this.userService.removeProductFromCart(await this.storage.get('id'), idp);
      await this.ngOnInit();
      const toast = await this.toastController.create({
        message: `Product removed from cart`,
        duration: 2000
      });
      toast.present();
      this.service.cartchange = true;
      this.refresh();

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
      await this.userService.addOrder((await this.storage.get('id')), order, (await this.storage.get('token')))
      const toast = await this.toastController.create({
        message: 'Order send successfully!',
        duration: 2000
      });
      toast.present();
      this.service.cartchange = true;
      this.refresh();
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
      await this.userService.increaseQuantity(await this.storage.get('id'), idp)
      this.service.cartchange = true;
      this.refresh();
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
      await this.userService.decreaseQuantity(await this.storage.get('id'), idp)
      this.service.cartchange = true;
      this.refresh();
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
