import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment,environment_config } from 'src/environments/environment';

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
  providedIn: `root`
})
export class AuthServiceService {

  constructor(private http: HttpClient) { this.signUp }


  signUp = (form: SignUpFormInterface) => { return this.http.post<Response>(`${environment.host}/register`, form, environment_config).toPromise() };

  logIn = (form: LoginFormInterface) => { return this.http.post<SuccessfulLogin>(`${environment.host}/login`, form, environment_config).toPromise() };

}




