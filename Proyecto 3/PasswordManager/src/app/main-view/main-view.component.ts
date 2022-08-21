import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CookieService } from 'ngx-cookie';
import { AuthService } from '../servicios/auth.service';
import { SessionData } from '../interfaz/session-data';
import { Auth } from '../interfaz/auth';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  events: string[] = [];
  opened: boolean = false;//sidebar
  miCuenta: boolean = true;
  llavero: boolean = false;
  config: boolean = false;

  displayMiCuenta(clicked: boolean){
      this.miCuenta = clicked;
      this.llavero = false;
      this.config = false;
  }
  displayLlavero(clicked: boolean){
    this.miCuenta = false;
    this.llavero = clicked;
    this.config = false;
  }
  displayConfig(clicked: boolean){
    this.miCuenta = false;
    this.llavero = false;
    this.config = clicked;
  }

  constructor(private authService: AuthService, private cookieService:CookieService) { }

  ngOnInit(): void {
    
  }

  onLogOut(){
    const cookie = this.cookieService.getObject('MyPasswordManagerAuth') as SessionData;
    if(cookie != null){
      this.authService.logOut(cookie).subscribe(respuesta => {
        this.cookieService.removeAll();
        window.location.href = '/login';
      })
    }
    
  }

}
