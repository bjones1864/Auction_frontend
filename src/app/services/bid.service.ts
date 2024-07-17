import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bid } from '../models/bid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private http:HttpClient) { }
  url: string = 'https://carauctionbackend20240705110500.azurewebsites.net';
  //url:string = "https://localhost:7158"
  allBid:Bid[] = [];

  getBid(id:number):Observable<Bid[]>{
    return this.http.get<Bid[]>(`${this.url}/api/Bid/getByCarId?carid=${id}`);
  }

  getHighestBid(id:number):Observable<number>{
    return this.http.get<number>(`${this.url}/api/Bid/gethighestBid?carid=${id}`)
  }

  postBid(newBid:Bid):Observable<Bid>{
    return this.http.post<Bid>(`${this.url}/api/Bid`,newBid);
  }

}
