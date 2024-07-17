import { BootstrapOptions, Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { Auction } from '../../models/auction';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Bid } from '../../models/bid';
import { FormsModule } from '@angular/forms';
import { BidService } from '../../services/bid.service';
import { User } from '../../models/user';
import { CountdownTimerComponent } from '../timer/timer.component';
import { Distance } from '../../models/distance';
import { DistanceService } from '../../services/distance.service';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Car } from '../../models/car';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [FormsModule, CountdownTimerComponent, RouterLink,DatePipe, CurrencyPipe, DecimalPipe],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css',
})
export class CarDetailsComponent {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _auctionService: AuctionService,
    private _userService: UserService,
    private _bidService: BidService,
    private _distance: DistanceService
  ) {}

  displayAuction: Auction = {} as Auction;
  id: number = 0;
  currentBid: Bid = {} as Bid;
  activeAuction: boolean = false;
  //timeRemaining: number = 0;
  allBids: Bid[] = []; //bid history
  currentUserId: number = 0;
  currentUser = {} as User;
  seller: User = {} as User;
  winningBid: boolean = false;
  distance: number = 0;
  currentHighBid: number = 0; //max bid until now

  ngOnInit() {
    this.displayAuction.car = {} as Car;
    this.getID();
    if (this.isLoggedIn()) {
      this._userService.isRegistered();
      this.currentBid.bidAmmount = 0;
    }
  }

  getID(): void {
    this._activatedRoute.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'));
      this._auctionService
        .getAuctionById(this.id)
        .subscribe((response: Auction) => {
          this.displayAuction = response;
          this.activeAuction = this.isActiveAuction();
          
          //this.timeRemaining = this.getCountdown();
          this.bidHistory();
          // console.log(this.displayAuction);
          
        });
    });
  }

  isActiveAuction(): boolean {
    // console.log(this.displayAuction);
    return this._auctionService.filterActiveAuction(this.displayAuction);
  }

  isLoggedIn(): boolean {
    return this._userService.loggedIn;
  }

  isRegistered(): boolean {
    return this._userService.registered;
  }

  bidHistory(): void {
    this._bidService
      .getBid(this.displayAuction.carId)
      .subscribe((response: Bid[]) => {
        this.allBids = response;
        //console.log(this.allBids);
        this.isWinner();
      });
  }

  AddBid() {
    this._userService
      .getIdByEmail(this._userService.user.email)
      .subscribe((response: number) => {
        this.currentBid.buyerId = response;
        this.currentBid.carId = this.displayAuction.carId;
        this.currentBid.timestamp = new Date();
        this._bidService.postBid(this.currentBid).subscribe((response) => {
          // console.log(response);
        });
      });
  }

  sellerInfo() {
    this._userService
      .getUserById(this.displayAuction.sellerId)
      .subscribe((response) => {
        this.seller = response;
        this.getDistance();
        //console.log('seller method');
      });
  }

  isWinner(): void {
    //console.log('is winner');
    //console.log(this.maxBid());
    let maxBidder: Bid = this.maxBid();
    this.currentHighBid = maxBidder.bidAmmount;
    //console.log(this.currentHighBid);
    if (this.isActiveAuction()) {
      this.winningBid = false;
      this.getminbid();
    } else {
      if (this.allBids.length == 0) {
        this.winningBid = false;
      } else {
        this.getminbid(); //works only for active auctions
        this._userService
          .getIdByEmail(this._userService.user.email)
          .subscribe((response) => {
            this.currentUserId = response;
            this.sellerInfo();
            this.winningBid = maxBidder.buyerId == this.currentUserId;
            return;
          });
      }
    }
    this._userService
      .getIdByEmail(this._userService.user.email)
      .subscribe((response) => {
        this.currentUserId = response;
        this.sellerInfo();
      });
  }

  maxBid(): Bid {
    if (this.allBids.length == 0) {
      let sellerBid: Bid = {} as Bid;
      sellerBid.bidAmmount = this.displayAuction.startingBid;
      // console.log(sellerBid);
      return sellerBid;
    } else { 
      // console.log(
      //   this.allBids.reduce((prev, current) =>
      //     current.bidAmmount > prev.bidAmmount ? current : prev
      //   )
      // );
      return this.allBids.reduce((prev, current) =>
        current.bidAmmount > prev.bidAmmount ? current : prev
      );
    }
  }

  getminbid(): void {
    if (this.currentHighBid == 0) {
      //console.log(this.displayAuction.startingBid + 50);
      this.currentHighBid = this.displayAuction.startingBid + 50;
    } else {
      //console.log(this.displayAuction.startingBid + 50);
      this.currentHighBid = this.currentHighBid + 50;
    }
  }

  //getUserById
  getDistance(): void {
    //console.log('distance method');
    this._userService
      .getUserById(this.currentUserId)
      .subscribe((response: User) => {
        this.currentUser = response;
        this._distance
          .getDistance(
            parseInt(this.seller.zip),
            parseInt(this.currentUser.zip)
          )
          .subscribe((response: Distance) => {
            //console.log(parseInt(this.seller.zip));
           // console.log(parseInt(this.currentUser.zip));
            //  console.log(response);

            this.distance = Math.round(response.distance);
          });
      });
  }
}
