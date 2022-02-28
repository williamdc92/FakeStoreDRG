import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/service/Shop-service/shop-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(public datab: ShopService) { }

  favorites = [];

  ngOnInit() {

  }

}
