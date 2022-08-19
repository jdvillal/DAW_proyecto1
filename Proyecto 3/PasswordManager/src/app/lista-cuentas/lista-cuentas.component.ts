import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-cuentas',
  templateUrl: './lista-cuentas.component.html',
  styleUrls: ['./lista-cuentas.component.css']
})
export class ListaCuentasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("lista");
  }

}
