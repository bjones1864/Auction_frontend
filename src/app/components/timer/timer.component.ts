import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  private subscription: Subscription = {} as Subscription;
  public dateNow = new Date();
  public dDay = new Date('Jul 17, 2024 00:00:00');
  //public timeDifference:number=0;
  public seconds: number = 0;
  public minutes: number = 0;
  public hours: number = 0;
  public days: number = 0;
  @Input() timeRemaining: Date={} as Date;

  ngOnInit() {
    this.subscription = interval(1000).subscribe((x) => {
      this.getTimeDifference();
    });
  }

  private getTimeDifference() {
    const DateNow = new Date();
    const DateAuction = new Date(this.timeRemaining);
    // console.log(DateNow.getTime() - DateAuction.getTime());
    this.allocateTimeUnits(DateAuction.getTime() - DateNow.getTime());
  }

  private allocateTimeUnits(timeDifference: number) {
    this.seconds = Math.floor((timeDifference / 1000) % 60);
    this.minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    this.hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
