import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../interfaz/login-data';
import { Session } from '../interfaz/session';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUserSummary(){
    return this.http.get('http://localhost:3000/api/summary', {withCredentials: true})
  }

  getServicesList(){
    return this.http.get('http://localhost:3000/api/services', {withCredentials: true})
  }

  getServiceIcon(imageName: String){
    return this.http.get('http://localhost:3000/api/icons/'+ imageName, {withCredentials: true})
  }

  getKeychain(imageName: String){
    return this.http.get('http://localhost:3000/api/keychain'+ imageName, {withCredentials: true})
  }
}
