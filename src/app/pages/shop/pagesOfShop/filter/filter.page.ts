import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RootObject, ShopService } from 'src/app/service/Shop-service/shop-service.service';
import { UserService } from 'src/app/service/UserService/user-service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  
  constructor(private route: ActivatedRoute, public service: ShopService, public userService: UserService, private storage: Storage) { }

  searchValue:string;  
  value: string;
  database: RootObject[];
  loading = true;
  error = false;
  
  async ngOnInit() {
    await this.storage.create();
    if (await this.storage.get('logged') === true) this.userService.activeSessions = true;
    
      this.route.params.subscribe(params => {this.value = params['producer'];});
    
    try {
      this.database = await this.service.getFilterByProducer(this.value);
      this.loading = false;
    }
    catch {
      console.log("Failed to load database")
      this.loading = false;
      this.error = true;
      
    }
    
    
    
    
  }
  
}
