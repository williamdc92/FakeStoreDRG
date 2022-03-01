import { Component, OnInit } from '@angular/core';
import { UserServiceService,User } from 'src/app/service/UserService/user-service.service';

@Component({
  selector: 'app-edit-database',
  templateUrl: './edit-database.page.html',
  styleUrls: ['./edit-database.page.scss'],
})
export class EditDatabasePage implements OnInit {

  users: User[];
  error:boolean = false;
  loading:boolean = true;
  searchValue:string;

  constructor(public userService: UserServiceService) { }

  async ngOnInit ()  {
    try {
      this.users = await this.userService.GetUsers();
      console.log(this.users);
      this.loading = false;
    }

    catch (err) {
      console.error(err);
      this.loading = false;
      this.error=true;
    }

  }

}
