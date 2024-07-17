import { Routes } from '@angular/router';
import { BuyComponent } from './components/buy/buy.component';
import { SellComponent } from './components/sell/sell.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';

export const routes: Routes = [
    {path:"",component:BuyComponent},
    {path:"sell",component:SellComponent},
    {path:"register",component:RegistrationComponent},
    {path:":id",component:CarDetailsComponent}
];
