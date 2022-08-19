import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListaCuentasComponent } from './lista-cuentas/lista-cuentas.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: "listacuentas", component: ListaCuentasComponent},
  {path: "login", component: LoginComponent},
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
