import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';



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
  cart: [];
  favourites: [];
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  activeSessions: boolean = false;

  constructor(private http: HttpClient) { }


GetUserByID = (id: string) => {return this.http.get<User>("https://servershopwilliam.herokuapp.com/users/"+id,{}).toPromise()};

};

