import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { CookieService } from 'ngx-cookie-service';
import { AccountItem } from '../interfaz/account-item';

@Component({
  selector: 'app-llavero',
  templateUrl: './llavero.component.html',
  styleUrls: ['./llavero.component.css']
})
export class LlaveroComponent implements OnInit {
  /*cuentas: AccountItem = {
    correo: '',
    usuario: '',
    password: '',
    nota: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    nombre: '',
    siteURL: '',
    iconURL: ''
  }*/
  cuentas: any[] = [];
  constructor(private apiService: ApiService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.apiService.getKeychain().subscribe(respuesta => {
      this.cuentas = respuesta as AccountItem[]
      console.log(this.cuentas);
    })
  }

}
