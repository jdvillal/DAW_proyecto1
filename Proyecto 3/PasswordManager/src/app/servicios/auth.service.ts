import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../interfaz/login-data';
import { Session } from '../interfaz/session';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logIn(loginData: LoginData) {
    return this.http.post('http://localhost:3000/login',loginData, {withCredentials: true})
  }

  verifySession(){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.post('http://localhost:3000/login/session', {}, {withCredentials: true});
  }

  logOut(){
    return this.http.post('http://localhost:3000/login/out', {}, {withCredentials: true});
  }

}
