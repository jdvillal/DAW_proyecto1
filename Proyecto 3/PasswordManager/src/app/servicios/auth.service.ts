import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../interfaz/auth';
import { LoginData } from '../interfaz/login-data';
import { SessionData } from '../interfaz/session-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  validateUser(loginData: LoginData) {
    return this.http.post('http://localhost:3000/login/validate', loginData)
  }

  validateSession(sessionData: SessionData){
    return this.http.post('http://localhost:3000/session/validate', sessionData);
  }

  logOut(sessionData: SessionData){
    return this.http.post('http://localhost:3000/session/logout', sessionData);
  }

}
