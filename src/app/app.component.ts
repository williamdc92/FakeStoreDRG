import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RootObject, ShopService } from 'src/app/service/Shop-service/shop-service.service';
import { Storage } from '@ionic/storage-angular';
import { UserService, User,Me } from './service/UserService/user-service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})



export class AppComponent {
  public appPages = [
    { title: 'Cart', url: '/cart', icon: 'cart' },
    { title: 'Favorites', url: '/favorites', icon: 'heart' },
    { title: 'Order History', url: '/order-history', icon: 'archive' }
  ];




  constructor(public router: Router, public service: ShopService, private storage: Storage, private userService: UserService, public toastController: ToastController) {
  }

  public producers = []
  public categories = [];
  database: RootObject[];
  currentUser: Me;
  isAdmin: boolean;


  async ngOnInit() {
    await this.storage.create();
    this.database = await this.service.GetDatabase();
    this.producers = this.database.map((item: { producer: string; }) => item.producer).filter((item, pos, self) => { return self.indexOf(item) == pos; });
    this.categories = this.database.map((item: { category: string; }) => item.category).filter((item, pos, self) => { return self.indexOf(item) == pos; });
    this.GetUser();


  }


  GetUser = async () => {

  if (await this.storage.get('logged') === true) {
    try 
       {
        this.currentUser = await this.userService.GetMe(await this.storage.get('token'));
        this.isAdmin = this.currentUser?.isAdmin;
      }

    
    catch (err) {
      console.log(err)
      console.log("section expired")
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


}
