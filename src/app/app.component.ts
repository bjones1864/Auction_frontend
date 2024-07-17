import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SellComponent } from './components/sell/sell.component';
import { BuyComponent } from './components/buy/buy.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SellComponent,BuyComponent,RouterLink,CarDetailsComponent, GoogleSigninButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AuctionFrontend';

  constructor(private _userService:UserService) { }
 
  ngOnInit() {
    //authState is a custom observable that will run again any time changes are noticed.
    this._userService.login();
  }

  isLoggedIn():boolean{
    return this._userService.loggedIn;
  }

  Signout(){
    this._userService.signOut();
  }

  
}
