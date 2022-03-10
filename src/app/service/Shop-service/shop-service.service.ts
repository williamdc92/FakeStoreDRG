import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';

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

  datachange:boolean = false;
  cartchange:boolean = false;
  

  GetDatabase = () => { return this.http.get<RootObject[]>(`${environment.host}/products`, {}).toPromise() };

  GetFilterByProducer = (producer: string) => { return this.http.get<RootObject[]>(`${environment.host}/products?producer=${producer}`, {}).toPromise() };

  GetFilterByCategory = (category: string) => { return this.http.get<RootObject[]>(`${environment.host}/products?category=${category}`, {}).toPromise() };

  GetFilterById = (id: string) => { return this.http.get<RootObject>(`${environment.host}/products/${id}`, {}).toPromise()};

  PostComment = (id: string, obj: Valutation, token:string) => {
    
    const option = {
      headers: {
          'authorization': `${token}`
      }
    }

    return this.http.post<Valutation>(`${environment.host}/products/${id}`, obj, option).toPromise()};
  
  DeleteProductById = (id: string) => { return this.http.delete<RootObject>(`${environment.host}/products/${id}`, {}).toPromise()}

  AddProduct = (obj:RootObject) => { return this.http.post<RootObject>(`${environment.host}/products`,obj).toPromise(); }
  
}




