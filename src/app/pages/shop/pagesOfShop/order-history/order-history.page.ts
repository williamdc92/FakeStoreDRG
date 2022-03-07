import { Component, OnInit } from '@angular/core';
import { UserService,orders } from 'src/app/service/UserService/user-service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  orders: orders[];
  
  
  loading = true;
  error = false;
  
  constructor(public userService: UserService, private storage: Storage, public toastController: ToastController) { }
  
  async ngOnInit() {
    await this.storage.create();
    
    if (await this.storage.get('logged') === true) this.userService.activeSessions = true;
    
    try {
      this.orders = await this.userService.GetOrders(await this.storage.get('id'));
      this.loading = false;
    }
    
    catch {
      console.log("Failed to load database")
      this.loading = false;
      this.error = true;
    }
  }
  
}
