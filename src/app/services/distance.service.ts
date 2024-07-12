import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Distance } from '../models/distance';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {
  constructor(private http:HttpClient){}
  // url:string = "https://carauctionbackend20240705110500.azurewebsites.net"
  url: string = 'https://localhost:7158';

getDistance(zip1:number,zip2:number):Observable<Distance>{
return this.http.get<Distance>(`${this.url}/api/Distance?zip1=${zip1}&zip2=${zip2}`)
  
}

}
