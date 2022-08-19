import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

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

  constructor() { }

  ngOnInit(): void {
    
  }

}
