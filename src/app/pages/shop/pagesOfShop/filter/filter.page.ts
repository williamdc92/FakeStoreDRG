import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RootObject, ShopService } from 'src/app/service/Shop-service/shop-service.service';
import { UserServiceService } from 'src/app/service/UserService/user-service.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  
  constructor(private route: ActivatedRoute, public service: ShopService, public userService: UserServiceService, private storage: Storage) { }

  searchValue:string;  
  value: string;
  sub: any;
  database: RootObject[];
  loading = true;
  error = false;
  
  async ngOnInit() {
    await this.storage.create();
    if (await this.storage.get('logged') === true) this.userService.activeSessions = true;
    
    this.sub = this.route.params.subscribe(params => {
      this.value = params['producer'];
    });
    
    try {
      this.database = await this.service.GetFilterByProducer(this.value);
      this.loading = false;
    }
    catch {
      console.log("Failed to load database")
      this.loading = false;
      this.error = true;
      
    }
    
    
    
    
  }
  
}
