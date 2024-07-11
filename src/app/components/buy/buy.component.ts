import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { AuctionService } from '../../services/auction.service';
import { Auction } from '../../models/auction';
import { BidService } from '../../services/bid.service';
import { RouterLink } from '@angular/router';
import { Bid } from '../../models/bid';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css',
})
export class BuyComponent {
  constructor(
    private _carService: CarService,
    private _auctionService: AuctionService,
    private _bidService: BidService
  ) {}

  allCars: Car[] = [];
  allAuctions: Auction[] = [];
  highestBids: { [carId: number]: number } = {};
  auctionStatus: { [carId: number]: string } = {};

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
    this.allAuctions.forEach((auction) => {
      this._bidService
        .getHighestBid(auction.carId)
        .subscribe((response: number) => {
          this.highestBids[auction.carId] = response;

          //getting auction status
          this.allAuctions.forEach((auction) => {
            if (this._auctionService.filterActiveAuction(auction)) {
              this.auctionStatus[auction.carId] = 'Active';
            } else if (auction.startingBid == this.highestBids[auction.carId]) {
              this.auctionStatus[auction.carId] = 'Elapsed';
            } else {
              this.auctionStatus[auction.carId] = 'Sold';
            }
          });

          
        });
    });
  }

}
