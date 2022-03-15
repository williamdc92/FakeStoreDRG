import { Component } from '@angular/core';
import { UserService } from 'src/app/service/UserService/user-service';
import { Storage } from '@ionic/storage-angular';
import { ShopService, RootObject } from 'src/app/service/Shop-service/shop-service.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-database',
  templateUrl: './edit-database.page.html',
  styleUrls: ['./edit-database.page.scss'],
})
export class EditDatabasePage {
  products: RootObject[];
  error: boolean = false;
  loading: boolean = true;
  token: string = "";
  admin: boolean = false;
  add: boolean = false;
  delete: boolean = false;
  searchValue: string;
  AddForm: FormGroup;


  constructor(public formBuilder: FormBuilder, public userService: UserService, public service: ShopService, private storage: Storage, public toastController: ToastController) {

    this.AddForm = this.formBuilder.group({
      title: [, [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(0)]],
      category: ['', [Validators.required, Validators.minLength(2)]],
      producer: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', [Validators.required, Validators.minLength(10)]],
    })

  }

  async ionViewWillEnter() {
    await this.takeProducts();

    await this.storage.create();
    this.token = await this.storage.get('token');
    await this.checkIsAdmin();

  }


  takeProducts = async () => {
    try {
      this.products = await this.service.getDatabase();
      this.loading = false;
    }

    catch (err) {
      console.error(err);
      this.loading = false;
      this.error = true;
    }
  }

  checkIsAdmin = async () => {
    try {
      return this.admin = ((await this.userService.getMe(this.token)).isAdmin); //avoiding external entry
    }

    catch {
      console.log("Failed to load info");
    }

  }

  deleteProduct = async (id: string) => {
    try {

      await this.service.deleteProductById(id);
      await this.ionViewWillEnter();
      const toast = await this.toastController.create({
        message: `Product removed from database`,
        duration: 2000
      });
      toast.present();
      this.service.datachange=true;


    }

    catch (err) {
      const toast = await this.toastController.create({
        message: `Cannot remove product from database`,
        duration: 2000
      });
      toast.present();

      console.log(err);

    }
  }

  addProduct = async () => {
    const Eform:RootObject = this.AddForm.value;

    try {
      await this.service.addProduct(Eform)
      await this.ionViewWillEnter();
      const toast = await this.toastController.create({
        message: `Product added successfully!`,
        duration: 2000
      });
      toast.present();
      this.service.datachange=true;
    }

    catch (err) {
      console.log(err);

      const toast = await this.toastController.create({
        message: `Cannot add product, please try again later`,
        duration: 2000
      });
      toast.present();

    }

  }




}