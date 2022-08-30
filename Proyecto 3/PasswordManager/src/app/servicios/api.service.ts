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
    return this.http.get('http://192.168.100.11:3000/api/summary', {withCredentials: true})
  }

  getServicesList(){
    return this.http.get('http://192.168.100.11:3000/api/services', {withCredentials: true})
  }

  getServiceIcon(imageName: String){
    return this.http.get('http://192.168.100.11:3000/api/icons/'+ imageName, {withCredentials: true})
  }

  getKeychain(){
    return this.http.get('http://192.168.100.11:3000/api/keychain', {withCredentials: true})
  }
}
