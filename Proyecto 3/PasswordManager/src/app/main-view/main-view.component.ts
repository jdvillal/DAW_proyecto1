import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../servicios/auth.service';
import { Session } from '../interfaz/session';

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
    const cookie = this.cookieService.get('userid');
    if(cookie === ""){
      window.location.href = '/login';
    }
  }

  onLogOut(){
    this.authService.logOut().subscribe(respuesta => {
      console.log('loging out');
      console.log(respuesta);
    });
    this.cookieService.deleteAll();
    window.location.href = '/login';
  }

}
