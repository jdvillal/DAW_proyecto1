import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-llavero',
  templateUrl: './llavero.component.html',
  styleUrls: ['./llavero.component.css']
})
export class LlaveroComponent implements OnInit {

  constructor(private apiService: ApiService, private cookieService: CookieService) { }

  ngOnInit(): void {

  }

}
