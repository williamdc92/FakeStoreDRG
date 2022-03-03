import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/service/UserService/user-service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.page.html',
  styleUrls: ['./user-permission.page.scss'],
})
export class UserPermissionPage {
  users: User[];
  error: boolean = false;
  loading: boolean = true;
  id: string = "";
  admin = false;

  constructor(public userService: UserService, private storage: Storage) {

  }

  async ionViewWillEnter() {
    await this.TakeUsers();

    await this.storage.create();
    this.id = await this.storage.get('id');

    await this.CheckIsAdmin();

  }


  TakeUsers = async () => {
    try {
      this.users = await this.userService.GetUsers();
      this.loading = false;
    }

    catch (err) {
      console.error(err);
      this.loading = false;
      this.error = true;
    }
  }

  CheckIsAdmin = async () => {
    try {
      return this.admin = (await this.userService.GetUserByID(this.id)).isAdmin; //avoiding external entry
    }

    catch {
      console.log("Failed to load info");
    }

  }

  ChangeAdminStatus = async (id: string) => {
    try {
      await this.userService.ChangeAdminStatus(id);
      await this.ionViewWillEnter();
    }
    catch (err) {
      console.log(err);
    }

  }

}
