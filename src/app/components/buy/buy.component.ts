import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { AuctionService } from '../../services/auction.service';
import { Auction } from '../../models/auction';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent {

  constructor(private _carService:CarService, private _auctionService:AuctionService){}
  allCars:Car[] = [];
  allAuctions:Auction[] = [];
  
  ngOnInit(){
    //this.getAllCars();
    this.getAllAuctions();
  }

  getAllCars(){
    this._carService.getAllCars().subscribe((response:Car[])=>{
      console.log(response);
      this.allCars = response;
    });
  }



  getAllAuctions(){
this._auctionService.getAllAuctions().subscribe((response:Auction[])=>{
console.log(response);
this.allAuctions = response;

})}

}
