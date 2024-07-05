import { Component, model } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';

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
    private _carService: CarService
  ) {}
  formModel: string = '';
  formMake: string = '';
  formYear: number = 0;

  filteredCARS: Car[] = [];
  myCAR: Car = {} as Car;

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
  }

 sellCar(){
console.log(this.myCAR)

 } 

}
