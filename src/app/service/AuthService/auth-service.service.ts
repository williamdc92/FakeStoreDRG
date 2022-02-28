import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SignUpFormInterface {

  name: string,
  surname: string,
  email: string,
  password: string

}

export interface LoginFormInterface {
  email: string,
  password: string
}

export interface SuccessfulLogin {
  grantType: string,
  token: string,
  email: string,
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { this.SignUp }


  SignUp = (form: SignUpFormInterface) => { return this.http.post<Response>('https://servershopwilliam.herokuapp.com/register', form).toPromise() };

  LogIn = (form: LoginFormInterface) => { return this.http.post<SuccessfulLogin>('https://servershopwilliam.herokuapp.com/login', form).toPromise() };

}




