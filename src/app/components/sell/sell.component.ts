import { Component, model } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { Auction } from '../../models/auction';
import { AuctionService } from '../../services/auction.service';
import { CarApi } from '../../models/car-api';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css',
})
export class SellComponent {
  constructor(
    private _userService: UserService,
    private _carService: CarService,
    private _auctionService: AuctionService,
    private router: Router
  ) {}
  formModel: string = '';
  formMake: string = '';
  formYear: number = 0;

  // filteredCARS: Car[] = [];
  filteredCARS: CarApi[] = [];
  myCAR: Car = {} as Car;
  myAUCTION: Auction = {} as Auction;
  tempCar: CarApi = {} as CarApi;
  carSelected: boolean = false;

  isLoggedIn(): boolean {
    return this._userService.loggedIn;
  }

  formSubmit() {
    this._carService
      .getCarsApi(this.formMake, this.formModel, this.formYear)
      .subscribe((response: CarApi[]) => {
        this.filteredCARS = response;
        //console.log(this.filteredCARS);
      });
  }

  selectCar(_myCar: CarApi) {
    this.tempCar = _myCar;
    this.myCAR.cityMpg = _myCar.city_mpg;
    this.myCAR.combinationMpg = _myCar.combination_mpg;
    this.myCAR.fuelType = _myCar.fuel_type;
    this.myCAR.highwayMpg = _myCar.highway_mpg;
    this.myCAR.class = _myCar.class;
    this.myCAR.cylinders = _myCar.cylinders;
    this.myCAR.displacement = _myCar.displacement;
    this.myCAR.drive = _myCar.drive;
    this.myCAR.make = _myCar.make;
    this.myCAR.model = _myCar.model;
    this.myCAR.sellerId = _myCar.sellerId;
    this.myCAR.transmission = _myCar.transmission;
    this.myCAR.year = _myCar.year;

    this._userService
      .getIdByEmail(this._userService.user.email)
      .subscribe((responseID: number) => {
        this.tempCar.sellerId = responseID;
        this.myCAR.sellerId = responseID;
        // console.log(responseID);
      })
    //  console.log(this.myCAR);
    this.carSelected = true;
  }

  sellCar() {
    this._userService
      .getIdByEmail(this._userService.user.email)
      .subscribe((responseID: number) => {
        this._carService
          .SellCar(
            this.tempCar,
            this.myCAR.color,
            this.myCAR.mileage,
            this.myCAR.image
          )
          .subscribe((response: Car) => {
            // console.log(this.myCAR);
            // console.log(this.tempCar);

            this.myAUCTION.carId = response.id;
            this.myAUCTION.sellerId = responseID;
            this._auctionService
              .postAuction(this.myAUCTION)
              .subscribe((responseAuction: Auction) => {
                //console.log(responseAuction);
                // console.log()
                this.refreshAndRedirect();
              });
          });
      });
  }
  refreshAndRedirect(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {});
  }
}
