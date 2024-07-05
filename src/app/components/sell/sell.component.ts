import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Car } from '../../models/car';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css'
})
export class SellComponent {
  constructor(private _userService:UserService){}
  formModel:string=""; formMake:string="";
  formYear:number=0;

  formSubmit(){
    
  }


}
