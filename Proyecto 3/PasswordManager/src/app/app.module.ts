import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatDividerModule} from '@angular/material/divider'
import {MatTooltipModule} from '@angular/material/tooltip';
import { CookieModule } from 'ngx-cookie';

import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainViewComponent } from './main-view/main-view.component';
import { CuentaInfoComponent } from './cuenta-info/cuenta-info.component';
import { ConfigComponent } from './config/config.component';
import { ApiInfoComponent } from './api-info/api-info.component';
import { LlaveroComponent } from './llavero/llavero.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainViewComponent,
    CuentaInfoComponent,
    ConfigComponent,
    ApiInfoComponent,
    LlaveroComponent
  ],
  imports: [
    CookieModule.withOptions(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    MatTooltipModule,
    BrowserAnimationsModule
  ],
  providers: [
    //{provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
