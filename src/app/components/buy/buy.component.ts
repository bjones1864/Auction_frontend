import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { AuctionService } from '../../services/auction.service';
import { Auction } from '../../models/auction';
import { BidService } from '../../services/bid.service';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css',
})
export class BuyComponent {
  constructor(
    private _carService: CarService,
    private _auctionService: AuctionService,
    private _bidService:BidService
  ) {}

  allCars: Car[] = [];
  allAuctions: Auction[] = [];
  highestBids: { [carId: number]: number } = {};

  ngOnInit() {
    this.getAllAuctions();
  }

  // getAllCars() {
  //   this._carService.getAllCars().subscribe((response: Car[]) => {
  //     // console.log(response);
  //     this.allCars = response;
  //   });
  // }

  getAllAuctions() {
    this._auctionService.getAllAuctions().subscribe((response: Auction[]) => {
      console.log(response);
      this.allAuctions = response;
      this.fetchHighestBids();
    });
  }

  // getHighestBid(id:number){
  //   this._bidService.getHighestBid(id).subscribe((response:number)=>{
  //     console.log(response)
  //     return response;
  //   })
  // }

  fetchHighestBids() {
    this.allAuctions.forEach(auction => {
      this._bidService.getHighestBid(auction.carId).subscribe((response: number) => {
        this.highestBids[auction.carId] = response;
      });
    });
  }

}
