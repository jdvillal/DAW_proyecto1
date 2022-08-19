import { Component, Input} from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PasswordManager';
  private cookie_name='';
  private all_cookies:any='';
  constructor() {}


  ngOnInit():void {

  }


  


}


