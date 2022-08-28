import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { LoginData } from '../interfaz/login-data';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
import { LoginResponse } from '../interfaz/loginResponse';
import { SessionResponse } from '../interfaz/sessionResponse';
import { Session } from '../interfaz/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private cookieService: CookieService) { }

  onclick(username: string, password: string) {
    console.log(username, password);
    const data: LoginData = { user: username, password: password };
    this.authService.logIn(data).subscribe(respuesta => {
      console.log(respuesta);
      let res = respuesta as LoginResponse
      console.log(res);
      if (res.isValidCredentials) {
        this.cookieService.set('userid', username);
        window.location.href = '/mainview';
      } else {
        this.cookieService.set('userid', "");
        let msgTag = document.getElementById('formMsg') as HTMLElement
        msgTag.innerText = res.message;
      }
    })
  }

  ngOnInit(): void {
    const cookie = this.cookieService.get('userid');
    if (!(cookie === "")) {
      console.log('found cookies', cookie);
      this.authService.verifySession().subscribe(respuesta => {
        let res = respuesta as any;
        console.log(respuesta);
        if (res.isValidSession) {
          window.location.href = '/mainview';
        }
      });
    }
  }
}
