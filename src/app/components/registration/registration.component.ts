import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { Auction } from '../../models/auction';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  constructor(private _userService: UserService) {}

  formUser: User = {} as User;
  
    
  isLoggedIn(): boolean {
    return this._userService.loggedIn;
  }

  postRegistration() {
    this.formUser.name = this._userService.user.name;
    this.formUser.email = this._userService.user.email;
    this._userService.registerUser(this.formUser).subscribe((response) => {
      //console.log(response);
       });}



}
