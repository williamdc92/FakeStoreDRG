import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RootObject, ShopService, Valutation } from 'src/app/service/Shop-service/shop-service.service';
import { ToastController } from '@ionic/angular';
import { UserService, Product } from 'src/app/service/UserService/user-service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  constructor(private route: ActivatedRoute, public service: ShopService, public userService: UserService, public toastController: ToastController, private storage: Storage) { }

  id: string;
  product: RootObject;
  valutations = [];
  rank: number;
  length: number;
  comment: boolean = false;

  currentValutation: Valutation = {
    nickname: "",
    star: 0,
    comment: "",
  };

  loading = true;
  error = false;
  isInFavourites: boolean = false;



  async ngOnInit() {
    await this.storage.create();
    this.route.params.subscribe(params => { this.id = params['id']; });
    try {
      this.product = await this.service.getFilterById(this.id);
      this.getScore();
      this.loading = false;
      this.isInFavourites = (await this.userService.getFavourites(await this.storage.get('id'))).some(item => item.id == (this.id))
    }
    catch {
      this.loading = false;
      this.error = true;
    }
  }


  getScore = async () => {
    this.valutations = this.product.valutations.map(val => val.star);
    this.rank = await this.valutations.reduce((rank, value) => rank + value, 0) / this.valutations.length;
  }

  valutate = async () => {
    let response: Valutation;

    try {
      response = await this.service.postComment(this.id, this.currentValutation, (await this.storage.get('token')));
      console.log(response);


      const toast = await this.toastController.create({
        message: 'Your valutation have been saved. Thank you!',
        duration: 2000
      });
      toast.present();

      this.currentValutation = {
        nickname: "",
        star: 0,
        comment: "",
      };

      this.ngOnInit();

    }



    catch (error) {
      console.log("Error posting comment " + error.message);
      const toast = await this.toastController.create({
        message: 'Your valutation cannot be send, please try again.',
        duration: 2000
      });
      toast.present();
    }



  }


  pushInCart = async () => {
    const { valutations, ...filtered } = this.product;
    const prod: Product = filtered;
    try {
      await this.userService.addProduct((await this.storage.get('id')), prod, (await this.storage.get('token')))
      this.service.cartchange = true;
      const toast = await this.toastController.create({
        message: 'Added in cart!',
        duration: 2000
      });
      toast.present();
    }

    catch (err) {
      const toast = await this.toastController.create({
        message: `Sorry, can't add item in cart`,
        duration: 2000
      });
      toast.present();
      console.log(err);
    }

  }

  pushInFavourites = async () => {
    const { valutations, ...filtered } = this.product;
    const prod: Product = filtered;
    try {
      await this.userService.addFavourites((await this.storage.get('id')), prod)
      const toast = await this.toastController.create({
        message: 'Added in favourites!',
        duration: 2000
      });
      toast.present();
      this.ngOnInit();
    }

    catch (err) {
      const toast = await this.toastController.create({
        message: `Sorry, can't add item in favourites`,
        duration: 2000
      });
      toast.present();
      console.log(err);
    }

  }

  removeFromFavourites = async () => {

    try {
      await this.userService.deleteFavourites((await this.storage.get('id')), this.id)
      const toast = await this.toastController.create({
        message: 'Removed from favourites',
        duration: 2000
      });
      toast.present();
      this.ngOnInit();
    }

    catch (err) {
      const toast = await this.toastController.create({
        message: `Sorry, can't remove item from favourites`,
        duration: 2000
      });
      toast.present();
      console.log(err);
    }

  }

}



