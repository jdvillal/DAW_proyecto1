import { Component, Input} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './servicios/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PasswordManager';
  private cookie_name='';
  private all_cookies:any='';
  constructor(private authService: AuthService, private cookieService: CookieService) {}


  ngOnInit(): void {

  }

}


