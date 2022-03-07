import { Component, OnInit } from '@angular/core';
import { UserService,Product } from 'src/app/service/UserService/user-service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(public userService: UserService, private storage: Storage) { }

  loading = true;
  error = false;
  favourites : Product[] 
 

  async ngOnInit() {
    await this.storage.create();
    if (await this.storage.get('logged') === true) this.userService.activeSessions = true;

    try {
      this.favourites = await this.userService.GetFavourites(await this.storage.get('id'));
      this.loading = false;      
    }
    
    catch {
      console.log("Failed to load database")
      this.loading = false;
      this.error = true;
    }
    
    
  }

  }


