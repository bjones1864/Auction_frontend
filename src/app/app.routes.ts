import { Routes } from '@angular/router';
import { BuyComponent } from './components/buy/buy.component';
import { SellComponent } from './components/sell/sell.component';

export const routes: Routes = [
    {path:"",component:BuyComponent},
    {path:"sell",component:SellComponent}

];
