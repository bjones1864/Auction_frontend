import { Car } from "./car";

export interface Auction {
    id:          number;
    carId:       number;
    sellerId:    number;
    startingBid: number;
    startTime:   Date;
    endTime:     Date;
    car:         Car;

}
