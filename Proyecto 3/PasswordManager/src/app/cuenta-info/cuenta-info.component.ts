import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { CookieService } from 'ngx-cookie-service';
import { AccountSummary } from '../interfaz/account-summary';

@Component({
  selector: 'app-cuenta-info',
  templateUrl: './cuenta-info.component.html',
  styleUrls: ['./cuenta-info.component.css']
})
export class CuentaInfoComponent implements OnInit {
  datos_cuenta: AccountSummary = {nombre: "", apellido: "", fechaNacimiento: new Date(), fechaRegistro: new Date(), username: ""}

  constructor(private apiService: ApiService, private cookieService: CookieService) { }

  ngOnInit(): void {
    const cookie = this.cookieService.get('userid');
    if (cookie != "") {
      console.log('found cookies', cookie);
      this.apiService.getUserSummary().subscribe(respuesta => {
        this.datos_cuenta = respuesta as AccountSummary
        //console.log("datos cuenta: ",this.datos_cuenta);
        /*if (res.isValidSession) {
          window.location.href = '/mainview';
        }*/
      });

      this.apiService.getServicesList().subscribe(respuesta => {
        let servicios = respuesta as any
        //console.log(servicios);
      })
    }
  }

}
