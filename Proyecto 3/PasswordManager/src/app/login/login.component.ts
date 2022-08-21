import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { LoginData } from '../interfaz/login-data';
import { Auth } from '../interfaz/auth';
import { CookieService } from 'ngx-cookie';
import { AppComponent } from '../app.component';
import { SessionData } from '../interfaz/session-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private cookieService:CookieService) {}

  onclick(username: string, password: string) {
    console.log(username, password);
    const data: LoginData = {username: username, password: password};
    this.authService.validateUser(data).subscribe(respuesta => {
      let res = respuesta as Auth
      console.log(res);
      if(res.valid){
        this.cookieService.putObject('MyPasswordManagerAuth', {userID: res.userid.toString(), sessionHash: res.sessionHash});
        window.location.href = '/mainview';
      }else{
        let msgTag = document.getElementById('formMsg') as HTMLElement
        if(res.tipo == "unregistered"){
          msgTag.innerText = "Usuario no registrado"
        }else if(res.tipo == null){
          msgTag.innerText = "Contraseña incorrecta, vuelva a intentarlo"
        }
      }
    })
  }

  ngOnInit(): void {
    const cookie = this.cookieService.getObject('MyPasswordManagerAuth') as SessionData;
    if(cookie != null){
      console.log('found cookies', cookie);
      this.authService.validateSession(cookie).subscribe(respuesta => {
        let res = respuesta as Auth;
        if(res.valid){
          window.location.href = '/mainview';
        }
      })
    }
  }

}
