import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';



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

export interface ProductInCart {
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
  product: ProductInCart;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  activeSessions: boolean = false;

  

  constructor(private http: HttpClient) { }


  

  GetMe = (token:string) => { 
    const option = {
      headers: {
          'authorization': `${token}`
      }
    }
  return this.http.get<Me>(`${environment.host}/me`,option).toPromise() 
};

  GetUserByID = (id: string) => { return this.http.get<User>(`${environment.host}/users/${id}`, {}).toPromise() };
  GetUsers = () =>  { return this.http.get<User[]>(`${environment.host}/users/`, {}).toPromise()};
  ChangeAdminStatus = (id: string) => { return this.http.put<User>(`${environment.host}/users/${id}/isadmin`,{},{}).toPromise()}; //REQ USER TOKEN (CHECK ADMIN)
  GetCart = (id: string) => { return this.http.get<CartElement[]>(`${environment.host}/users/${id}/cart`, {}).toPromise() };
  AddProductInCart = (id:string, product:ProductInCart) => {return this.http.post<CartElement>(`${environment.host}/users/${id}/cart`,product,{}).toPromise()} //REQ USER TOKEN

};

