import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RootObject, ShopService, Valutation } from 'src/app/service/Shop-service/shop-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  constructor(private route: ActivatedRoute, public service : ShopService, public toastController: ToastController) { }

  id: string ;
  sub:any;
  product: RootObject;
  valutations=[];
  rank:number;
  length: number;
  comment :boolean = false;
  
  currentValutation:Valutation ={
    nickname:"",
    star:0,
    comment:"",
  };

  loading=true;
  error=false;
  


  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {this.id = params['id'];});
    try {
      this.product = await this.service.GetFilterById(this.id);
      this.GetScore();
      this.loading=false;
    }
    catch {
      this.loading=false;
      this.error=true;
    }
  }


  GetScore = async () => {
    this.valutations = this.product.valutations.map(val => val.star);
    this.rank = await this.valutations.reduce((rank,value) => rank + value,0)/this.valutations.length;
  }

  async Valutate() {
  let response:Valutation;

    try {
    response = await this.service.PostComment(this.id,this.currentValutation);
     console.log(response);

    
      const toast = await this.toastController.create({
        message: 'Your valutation have been saved. Thank you!',
        duration: 2000
      });
      toast.present();

      this.currentValutation ={
        nickname:"",
        star:0,
        comment:"",
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

}
