import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { Observable } from 'rxjs';
import { CarApi } from '../models/car-api';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http:HttpClient){}
  allCars:Car[] = [];
  url:string = "https://carauctionbackend20240705110500.azurewebsites.net"
  //url: string = 'https://localhost:7158';
  getCarsApi(make:string,model:string,year:number):Observable<CarApi[]>{
      return this.http.get<CarApi[]>(`${this.url}/api/Car?make=${make}&model=${model}&year=${year}`)
  }

  getAllCars():Observable<Car[]>{
    return this.http.get<Car[]>(`${this.url}/api/Car/test`)
  }

  SellCar(newcar:CarApi,color:string,miles:number,img:string):Observable<Car>{
    return this.http.post<Car>(`${this.url}/api/Car?color=${color}&miles=${miles}&img=${img}`,newcar);
  }


}
