import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent {

  constructor(private _carService:CarService){}
  allCars:Car[] = [];

  ngOnInit(){
    this.getAllCars();
  }

  getAllCars(){
    this._carService.getAllCars().subscribe((response:Car[])=>{
      console.log(response);
      this.allCars = response;
    });
  }

}
