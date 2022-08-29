import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cuenta-info',
  templateUrl: './cuenta-info.component.html',
  styleUrls: ['./cuenta-info.component.css']
})
export class CuentaInfoComponent implements OnInit {

  constructor(private apiService: ApiService, private cookieService: CookieService) { }

  ngOnInit(): void {
    const cookie = this.cookieService.get('userid');
    if (cookie != "") {
      console.log('found cookies', cookie);
      //this.apiService.getUserSummary().subscribe(respuesta => {
      //  let res = respuesta as any;
      //  console.log(res);
        /*if (res.isValidSession) {
          window.location.href = '/mainview';
        }*/
      //});

      this.apiService.getServicesList().subscribe(respuesta => {
        let res = respuesta as any
        console.log(res);
      })
    }
  }

}
