import { Component } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import { SearchResult } from '../search-result';
import { SearchSearvice } from '../searchService.mock';
import { FlightDetail } from '../../app/flightDetail';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  searchForm = new SearchResult ( '',  '',   new Date(Date.now()),  1, );
  someRange= [1000, 10000]; // range binded to price ranger
  foundFlights: FlightDetail []; // One way flights
  secoundFlights: FlightDetail []; // Two way flights
  mainOneWaySearch: FlightDetail []; // finalSearch binded with UI
  mainTwoWaySearch: FlightDetail []; // finalSearch binded with UI
  updateFlights = [];

  tabSelected = false;
  formSubmit = false;

  optionsStartDate: DatepickerOptions;
  optionsEndDate: DatepickerOptions;

  // Slider basic configurations
  sliderConfig: any = {
    behaviour: 'drag',
    connect: [true, true, true],
    tooltips: true,
    start: [1000, 10000],
    keyboard: true,
    step: 1000,
    pageSteps: 1000, 
    range: {
      min: 1000,
      max: 10000
    }
  }
  constructor(
    private searchSearvice: SearchSearvice
  ) { 
    // Set Configuration For Start Date
    this.optionsStartDate = {
      displayFormat: 'DD-MM-YYYY',
      firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
      minDate: new Date(Date.now()), // Minimal selectable date
      placeholder: 'Depart Date',
      fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    };
    
  }

  search(info) {
    this.formSubmit = true;
    if(info.endDate != undefined) {
      // call the service to get one way flights info
      this.searchSearvice.getTwoWayFlights(info).subscribe((response) => {
        this.secoundFlights = response;
        this.mainTwoWaySearch = response;
      }, (err) => {
        this.secoundFlights = null;
      });
    }  
    // call the service to get two way flights info
    this.searchSearvice.getOneWayFlights(info).subscribe((response) => {
      this.foundFlights = response;
      this.mainOneWaySearch = response;
    }, (err) => {
      this.foundFlights = null;
    });    
  }
  
  /**
   * @function onRangeChange
   * @param evt gets range value
   * returns array of Flights based on range
   * @author Tithi
   */
  onRangeChange(evt) {
    this.updateFlights = []
    this.someRange = evt;
    if(this.foundFlights) {
      this.foundFlights.forEach(element => {
        if(element.price >= this.someRange[0] && element.price <= this.someRange[1]) {
          this.updateFlights.push(element);
        }
      });
      this.mainOneWaySearch = this.updateFlights;
    }
    if(this.secoundFlights && this.foundFlights) {
      this.secoundFlights.forEach(element => {
        if(element.price >= this.someRange[0] && element.price <= this.someRange[1]) {
          this.updateFlights.push(element);
        }
      });

      this.mainTwoWaySearch = this.updateFlights;
      this.foundFlights.forEach(element => {
        if(element.price >= this.someRange[0] && element.price <= this.someRange[1]) {
          this.updateFlights.push(element);
        }
      });
      this.mainOneWaySearch = this.updateFlights;
    }
  }

  /**
   * @function setEndDate
   * @param evt gets selected date
   * returns configuration object for returnDate
   * @author Tithi
   */
  setEndDate(evt) {
    let dd = new Date(evt);
    if(evt) {
      this.optionsEndDate = {
        displayFormat: 'DD-MM-YYYY',
        firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
        minDate: new Date(dd.setDate(dd.getDate() + 1)),  // Minimal selectable date        
        placeholder: 'Return Date',
        fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
      };
    }
  }
}
