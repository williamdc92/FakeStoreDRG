import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Valutation {
  nickname: string;
  star: number;
  comment: string;
}

export interface RootObject {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  producer: string;
  image: string;
  valutations: Valutation[];
}



@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { this.GetDatabase }

  GetDatabase = () => { return this.http.get<RootObject[]>("https://servershopwilliam.herokuapp.com/products", {}).toPromise() };

  GetFilterByProducer = (producer: string) => { return this.http.get<RootObject[]>("https://servershopwilliam.herokuapp.com/products?producer=" + producer, {}).toPromise() };

  GetFilterByCategory = (category: string) => { return this.http.get<RootObject[]>("https://servershopwilliam.herokuapp.com/products?category=" + category, {}).toPromise() };

  GetFilterById = (id: string) => { return this.http.get<RootObject>("https://servershopwilliam.herokuapp.com/products/" + id, {}).toPromise() };

  PostComment = (id: string, obj: Valutation) => { return this.http.post<Valutation>("https://servershopwilliam.herokuapp.com/products/" + id, obj, {}).toPromise() };
  
}




