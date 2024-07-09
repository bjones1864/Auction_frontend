import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private socialAuthServiceConfig: SocialAuthService,
    private http: HttpClient
  ) {}
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  registered: boolean = false;
  //url:string = "https://carauctionbackend20240705110500.azurewebsites.net";

  url: string = 'https://localhost:7158';

  login() {
    this.socialAuthServiceConfig.authState.subscribe(
      (userResponse: SocialUser) => {
        this.user = userResponse;
        //if login fails, it will return null.
        this.loggedIn = userResponse != null;
        console.log(this.user);
      }
    );
  }

  registerUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.url}/api/User`, newUser);
  }

  //login component doesn't account for logging out.
  signOut(): void {
    this.socialAuthServiceConfig.signOut();
  }

  getIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(
      `${this.url}/api/User/getIdByEmail?email=${email}`
    );
  }

  isRegistered() {
    this.getIdByEmail(this.user.email).subscribe((response: number) => {
      if (response != null) {
        this.registered = true;
      } else {
        this.registered = false;
      }
    });
  }
  
}
