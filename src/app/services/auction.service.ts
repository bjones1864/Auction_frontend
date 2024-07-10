import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { Auction } from '../models/auction';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  //url: string = 'https://carauctionbackend20240705110500.azurewebsites.net';
  url: string = 'https://localhost:7158';

  constructor(private http: HttpClient) {}
  allAuctions: Auction[] = [];

  getAllAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(`${this.url}/api/Auction`);
  }

  getAuctionById(id: number): Observable<Auction> {
    return this.http.get<Auction>(`${this.url}/api/Auction/${id}`);
  }

  postAuction(newAuction: Auction): Observable<Auction> {
    return this.http.post<Auction>(`${this.url}/api/Auction`, newAuction);
  }

  filterActiveAuction(A: Auction): boolean {
    const DateNow = new Date();
    const DateAuction = new Date(A.endTime);
    //console.log(DateNow.getTime() - DateAuction.getTime());
    console.log(DateNow < DateAuction);
    return DateNow < DateAuction;
  }
  


}
