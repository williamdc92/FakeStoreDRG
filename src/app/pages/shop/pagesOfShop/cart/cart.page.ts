import { Component, OnInit } from '@angular/core';
import { UserService,CartElement } from 'src/app/service/UserService/user-service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: CartElement[];
  searchValue:string;
  
  loading = true;
  error = false;

  total:number = 0;

  
  
  constructor(public userService: UserService, private storage: Storage) { }
  
  async ngOnInit() {
    await this.storage.create();
    
    if (await this.storage.get('logged') === true) this.userService.activeSessions = true;
    
    try {
      this.cart = await this.userService.GetCart(await this.storage.get('id'));
      this.loading = false;
      this.total = this.cart.map(item => item.tot).reduce((sum, item) => sum + item)
      console.log(this.total)
      
    }
    
    catch {
      console.log("Failed to load database")
      this.loading = false;
      this.error = true;
    }
    
    
  }

}
