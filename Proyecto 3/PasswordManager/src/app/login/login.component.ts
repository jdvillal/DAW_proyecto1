import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { LoginData } from '../interfaz/login-data';
import { Auth } from '../interfaz/auth';
import { CookieService } from 'ngx-cookie';
import { AppComponent } from '../app.component';

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
      //console.log(respuesta.);
      if(res.valid){
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
    const id = this.cookieService.getObject('MyPasswordManagerAuth');
    if(id != null){
      console.log(this.cookieService.get('MyPasswordManagerAuth'));
      window.location.href = '/mainview';
    }
  }

}
