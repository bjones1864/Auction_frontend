import { Component, model } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { Auction } from '../../models/auction';
import { AuctionService } from '../../services/auction.service';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css',
})
export class SellComponent {
  constructor(
    private _userService: UserService,
    private _carService: CarService,
    private _auctionService: AuctionService
  ) {}
  formModel: string = '';
  formMake: string = '';
  formYear: number = 0;

  filteredCARS: Car[] = [];
  myCAR: Car = {} as Car;
  myAUCTION: Auction = {} as Auction;

  carSelected: boolean = false;

  isLoggedIn(): boolean {
    return this._userService.loggedIn;
  }

  formSubmit() {
    this._carService
      .getCarsApi(this.formMake, this.formModel, this.formYear)
      .subscribe((response: Car[]) => {
        this.filteredCARS = response;
        console.log(this.filteredCARS);
      });
  }

  selectCar(_myCar: Car) {
    this.myCAR = _myCar;
    console.log(this.myCAR);
    this.carSelected = true;
  }


  sellCar() {
    this._userService
      .getIdByEmail(this._userService.user.email)
      .subscribe((responseID: number) => {
        this.myCAR.sellerId = responseID;
        this._carService
          .SellCar(
            this.myCAR,
            this.myCAR.color,
            this.myCAR.mileage,
            this.myCAR.image
          )
          .subscribe((response: Car) => {
            console.log(this.myCAR);
            console.log(response);
            this.myAUCTION.carId=response.id
            this.myAUCTION.sellerId=responseID
            this._auctionService.postAuction(this.myAUCTION).subscribe((responseAuction:Auction)=>{
              console.log(responseAuction);
            })
          });
      });
  }
}
