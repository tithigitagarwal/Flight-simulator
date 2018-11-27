import { Observable, of } from 'rxjs';
import { FlightDetail } from '../app/flightDetail';

export class SearchSearvice {
  // Mock data for Flights
  flights: FlightDetail[] = [
    {
        id: 'MO01',
        origin: 'Delhi',
        destination: 'Mumbai',
        startDate: '18/09/2018',
        returnDate: '18/09/2018',
        price: 5000,
        arrivalTime: '5:00 AM',
        departureTime: '7:00 AM',
    },
    {
        id: 'MO02',
        origin: 'Pune',
        destination: 'Mumbai',
        startDate: '18/09/2018',
        returnDate: '18/08/2018',
        price: 5000,
        arrivalTime: '5:00 AM',
        departureTime: '7:00 AM',
    },
    {
        id: 'MO03',
        origin: 'Delhi',
        destination: 'Pune',
        startDate: '18/08/2018',
        returnDate: '18/08/2018',
        price: 5000,
        arrivalTime: '5:00 AM',
        departureTime: '7:00 AM',
    },
    {
        id: 'MO04',
        origin: 'Delhi',
        destination: 'Goa',
        startDate: '18/08/2018',
        returnDate: '18/08/2018',
        price: 5000,
        arrivalTime: '5:00 AM',
        departureTime: '7:00 AM',
    },
    {
        id: 'MO05',
        origin: 'Mumbai',
        destination: 'Delhi',
        startDate: '18/08/2018',
        returnDate: '18/08/2018',
        price: 5000,
        arrivalTime: '5:00 AM',
        departureTime: '7:00 AM',
    },
    {
        id: 'MO06',
        origin: 'Delhi',
        destination: 'Mumbai',
        startDate: '18/08/2018',
        returnDate: '18/08/2018',
        price: 4000,
        arrivalTime: '8:00 AM',
        departureTime: '9:00 AM',
    },
    {
        id: 'MO07',
        origin: 'Mumbai',
        destination: 'Delhi',
        startDate: '18/08/2018',
        returnDate: '18/08/2018',
        price: 7000,
        arrivalTime: '9:00 AM',
        departureTime: '11:00 AM',
    },
    
    {
        id: 'MO07',
        origin: 'Delhi',
        destination: 'Mumbai',
        startDate: '18/08/2018',
        returnDate: '18/08/2018',
        price: 4000,
        arrivalTime: '9:00 AM',
        departureTime: '11:00 AM',
    },
    {
        id: 'MO08',
        origin: 'Goa',
        destination: 'Delhi',
        startDate: '18/08/2018',
        returnDate: '18/08/2018',
        price: 2000,
        arrivalTime: '8:00 AM',
        departureTime: '10:00 AM',
    },
    {
        id: 'MO09',
        origin: 'Goa',
        destination: 'Delhi',
        startDate: '18/08/2018',
        returnDate: '18/08/2018',
        price: 4000,
        arrivalTime: '2:00 PM',
        departureTime: '4:00 PM',
    },
  ];
/**
 * method gets the origin and destination
 * It returns observable of type FlightDetail
 * The data consisit of one way flights
*/
  getOneWayFlights(info): Observable<FlightDetail[]> {
    const foundFlights: FlightDetail[] = [];   

    for (const key of Object.keys(this.flights)) {
        if (this.flights[key].origin === info.origin && this.flights[key].destination === info.destination) {
            foundFlights.push(this.flights[key]);
        }
    }
    return of(foundFlights);
  }

/**
 * method gets the origin and destination
 * It returns observable of type FlightDetail
 * The data consisit of two way flights
*/
  getTwoWayFlights(info): Observable<FlightDetail[]> {
    let foundFlights: FlightDetail[] = [];
    for (const key of Object.keys(this.flights)) {
        if (this.flights[key].origin === info.destination && this.flights[key].destination === info.origin) {
            foundFlights.push(this.flights[key]);
        }
    } 
    return of(foundFlights);
  }
}