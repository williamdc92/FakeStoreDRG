import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RootObject, ShopService } from 'src/app/service/Shop-service/shop-service.service';
import { Storage } from '@ionic/storage-angular';
import { UserService } from 'src/app/service/UserService/user-service';


@Component({
  selector: 'app-filtercategory',
  templateUrl: './filtercategory.page.html',
  styleUrls: ['./filtercategory.page.scss'],
})
export class FiltercategoryPage implements OnInit {
  
  constructor(private route: ActivatedRoute, public service: ShopService, public userService: UserService, private storage: Storage) { }
  
  value: string;
  database: RootObject[];
  loading = true;
  error = false;
  searchValue:string; 
  
  async ngOnInit() {
    await this.storage.create();
    
    if (await this.storage.get('logged') === true) this.userService.activeSessions = true;
  
      this.route.params.subscribe(params => {this.value = params['category'];});

    try {
      this.database = await this.service.GetFilterByCategory(this.value);
      this.loading = false;
    }
    catch {
      console.log("Failed to load database")
      this.loading = false;
      this.error = true; 
    }
  }
}
