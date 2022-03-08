import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, orders } from 'src/app/service/UserService/user-service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  order_id: string;
  order: orders;
  loading: boolean = true;
  error:boolean = false;

  constructor(private route: ActivatedRoute, public userService: UserService, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();

    try {
      this.route.params.subscribe(params => { this.order_id = params['id']; });
      this.order = await this.userService.GetOrderById(await this.storage.get('id'), this.order_id);
      this.loading= false;
    }
    catch (err) {
      console.log(err);
      this.loading= false;
      this.error= true;
    }
  }
}
