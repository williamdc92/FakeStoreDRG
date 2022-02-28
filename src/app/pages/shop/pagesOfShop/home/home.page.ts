import { Component, OnInit } from '@angular/core';
import { ShopService, RootObject } from 'src/app/service/Shop-service/shop-service.service';
import { UserServiceService, User } from 'src/app/service/UserService/user-service.service';
import { Storage } from '@ionic/storage-angular';





@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  database: RootObject[];

  loading = true;
  error = false;


  constructor(public service: ShopService, public userService: UserServiceService, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();

    if (await this.storage.get('logged') === true) this.userService.activeSessions = true;
    
    try {
      this.database = await this.service.GetDatabase();
      this.loading = false;

    }

    catch {
      console.log("Failed to load database")
      this.loading = false;
      this.error = true;
    }


  }



}






