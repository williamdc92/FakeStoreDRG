import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  token: string;
  address: string;
  isAdmin: boolean;
  orders: [];
  cart: CartElement[];
  favourites: [];
}

export interface Me {
  id: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  producer: string;
  image: string;
}

export interface CartElement {
  tot: number;
  quantity: number;
  product: Product;
}

export interface orders {
  date: Date;
  total: number;
  items: CartElement[];
  id:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  activeSessions: boolean = false;
  cartfirstcheck:boolean = false;
  userfirstcheck:boolean = false;



  constructor(private http: HttpClient) { }




  getMe = (token: string) => {
    const option = {
      headers: {
        'authorization': `${token}`
      }
    }

    return this.http.get<Me>(`${environment.host}/me`, option).toPromise()

  };

  getUserByID = (id: string) => { return this.http.get<User>(`${environment.host}/users/${id}`, {}).toPromise() };
  getUsers = () => { return this.http.get<User[]>(`${environment.host}/users/`, {}).toPromise() };

  changeAdminStatus = (id: string, token: string) => {

    const option = {
      headers: {
        'authorization': `${token}`
      }
    }

    return this.http.put<User>(`${environment.host}/users/${id}/isadmin`, {}, option).toPromise()
  }; 


  getCart = (id: string) => { return this.http.get<CartElement[]>(`${environment.host}/users/${id}/cart`, {}).toPromise() };

  getOrders = (id: string) => { return this.http.get<orders[]>(`${environment.host}/users/${id}/orders`, {}).toPromise() };

  addProduct = (id: string, product: Product, token: string) => {
    const option = {
      headers: {
        'authorization': `${token}`
      }
    }

    return this.http.post<CartElement>(`${environment.host}/users/${id}/cart`, product, option).toPromise()
  }

  addOrder = (id: string, order: orders, token: string) => {
    const option = {
      headers: {
        'authorization': `${token}`
      }
    }

    return this.http.post<orders>(`${environment.host}/users/${id}/orders`, order, option).toPromise()
  } 

  getOrderById = (id:string, ido:string) => {
    return this.http.get<orders>(`${environment.host}/users/${id}/orders/${ido}`).toPromise();
  }

  removeProductFromCart = (id: string, idp: string) => {
    return this.http.delete<CartElement>(`${environment.host}/users/${id}/cart/${idp}`, {}).toPromise()
  }

  increaseQuantity = (id: string, idp: string) => {
    return this.http.put <CartElement>(`${environment.host}/users/${id}/cart/${idp}/increase`, {}).toPromise()
  }

  decreaseQuantity = (id: string, idp: string) => {
    return this.http.put <CartElement>(`${environment.host}/users/${id}/cart/${idp}/decrease`, {}).toPromise()
  }

  addFavourites = (id: string, product: Product) => {
    return this.http.post <Product>(`${environment.host}/users/${id}/favourites`,product).toPromise()
  }

  deleteFavourites = (id:string, idp: string) => {
    return this.http.delete <Product>(`${environment.host}/users/${id}/favourites/${idp}`, {}).toPromise()
  }

  getFavourites = (id:string) => {
    return this.http.get<Product[]>(`${environment.host}/users/${id}/favourites`, {}).toPromise()
  }

};

