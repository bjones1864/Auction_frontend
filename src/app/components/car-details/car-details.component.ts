import { BootstrapOptions, Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { Auction } from '../../models/auction';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Bid } from '../../models/bid';
import { FormsModule } from '@angular/forms';
import { BidService } from '../../services/bid.service';
import { User } from '../../models/user';
import { CountdownTimerComponent } from '../timer/timer.component';
import { Distance } from '../../models/distance';
import { DistanceService } from '../../services/distance.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [FormsModule, CountdownTimerComponent],
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

  ngOnInit() {
    this.getID();
    if (this.isLoggedIn()) {
      this._userService.isRegistered();
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
    console.log(this.displayAuction);
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
        console.log(this.allBids);
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

  getCountdown(): number {
    const DateNow = new Date();
    const DateAuction = new Date(this.displayAuction.endTime);
    // console.log(DateNow.getTime() - DateAuction.getTime());
    return DateAuction.getTime() - DateNow.getTime();
  }

  isWinner(): void {
    console.log('is winner');
    this.maxBid();
    if (this.isActiveAuction()) {
      this.winningBid = false;
    } else {
      if (this.allBids.length == 0) {
        this.winningBid = false;
      } else {
        let maxBidder: Bid = this.maxBid();
        this._userService
          .getIdByEmail(this._userService.user.email)
          .subscribe((response) => {
            this.currentUserId = response;
            this.sellerInfo();
            //console.log(maxBidder.buyerId );
            //console.log(this.currentUserId);
            //console.log(maxBidder.buyerId == this.currentUserId);
            this.winningBid = maxBidder.buyerId == this.currentUserId;
          });
      }
    }
  }

  sellerInfo() {
    this._userService
      .getUserById(this.displayAuction.sellerId)
      .subscribe((response) => {
        this.seller = response;
        this.getDistance();
      });
  }

  maxBid(): Bid {
    console.log(
      this.allBids.reduce((prev, current) =>
        current.bidAmmount > prev.bidAmmount ? current : prev
      )
    );
    return this.allBids.reduce((prev, current) =>
      current.bidAmmount > prev.bidAmmount ? current : prev
    );
  }

  //getUserById
  getDistance(): void {
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
            console.log(parseInt(this.seller.zip));
            console.log(parseInt(this.currentUser.zip));
           console.log(response);
          
            this.distance = response.distance;
          });
      });
  }
}
