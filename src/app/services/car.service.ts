import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http:HttpClient){}
  allCars:Car[] = [];
  url:string = "https://carauctionbackend20240705110500.azurewebsites.net"

  getCarsApi(make:string,model:string,year:number):Observable<Car[]>{
      return this.http.get<Car[]>(`${this.url}/api/Car?make=${make}&model=${model}&year=${year}`)
  }

  getAllCars():Observable<Car[]>{
    return this.http.get<Car[]>(`${this.url}/api/Car/test`)
  }

  SellCar(newcar:Car,color:string,miles:number,img:string):Observable<Car>{
    return this.http.post<Car>(`${this.url}/api/Car?color=${color}&miles=${miles}&img=${img}`,newcar);
  }


}
