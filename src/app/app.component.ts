import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RootObject, ShopService } from 'src/app/service/Shop-service/shop-service.service';
import { Storage } from '@ionic/storage-angular';
import { UserServiceService, User } from './service/UserService/user-service.service';
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




  constructor(public router: Router, public service: ShopService, private storage: Storage, private userService: UserServiceService) {
  }

  public producers = []
  public categories = [];
  database: RootObject[];
  currentUser: User;
  isAdmin: boolean;


  async ngOnInit() {
    await this.storage.create();
    this.database = await this.service.GetDatabase();
    this.producers = this.database.map((item: { producer: string; }) => item.producer).filter((item, pos, self) => { return self.indexOf(item) == pos; });
    this.categories = this.database.map((item: { category: string; }) => item.category).filter((item, pos, self) => { return self.indexOf(item) == pos; });
    this.GetUser();


  }


  GetUser = async () => {

    try {
      if (await this.storage.get('logged') === true) {
        this.currentUser = await this.userService.GetUserByID(await this.storage.get('id'));
        this.isAdmin = this.currentUser?.isAdmin;
      }

    }
    catch (err) {
      console.log(err)
    }


  }

  LogOut = async () => {
    await this.storage.set('logged', false);
    await this.storage.set('viewed', false);
    await this.storage.set('email', "");
    await this.storage.set('token', "");
    await this.storage.set('id', undefined);

    this.userService.activeSessions = false;
    await this.router.navigate(['tutorial'])
  }


}
