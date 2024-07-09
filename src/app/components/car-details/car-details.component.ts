import { Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { Auction } from '../../models/auction';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Bid } from '../../models/bid';
import { FormsModule } from '@angular/forms';
import { BidService } from '../../services/bid.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent {
  constructor(private _activatedRoute:ActivatedRoute ,
    private _auctionService:AuctionService,
    private _userService:UserService,
    private _bidService:BidService
  ){}
  displayAuction:Auction = {} as Auction;
  id:number=0;
  currentBid:Bid = {} as Bid;

  ngOnInit(){
    this.getID();
    if(this.isLoggedIn()){
    this._userService.isRegistered();}
  }

  getID(): void{
    this._activatedRoute.paramMap.subscribe((param) => {
      this.id = Number(param.get("id"));
      this._auctionService.getAuctionById(this.id).subscribe((response:Auction)=>{
      this.displayAuction = response;
      // console.log(this.displayAuction);
      })
    })
  }

  isLoggedIn():boolean{
    return this._userService.loggedIn;
  }

  isRegistered():boolean{
    return this._userService.registered;
  }

  AddBid(){
    this._userService.getIdByEmail(this._userService.user.email).subscribe((response:number)=>{
      this.currentBid.buyerId = response;
      this.currentBid.carId = this.displayAuction.carId;
      this.currentBid.timestamp = new Date();
      this._bidService.postBid(this.currentBid).subscribe((response)=>{
        // console.log(response);
      })
    });
  }

}
