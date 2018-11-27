import { async, ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NouisliderModule } from 'ng2-nouislider';
import { FormsModule }   from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import { Observable, throwError, of } from 'rxjs';
import { SearchComponent } from './search.component'; 
import { SearchSearvice } from '../searchService.mock';
fdescribe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let service: SearchSearvice;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        FormsModule,
        NouisliderModule,
        NgDatepickerModule
      ],
      providers: [
        SearchSearvice
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new SearchSearvice();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it ('should get the one way flight info', fakeAsync(() => {
      const searchInfo = {
        'startDate': 'Fri Aug 24 2018 00:00:00 GMT+0530 (IST) {}',
        'endDate': undefined,
        'origin': 'Delhi',
        'destination': 'Mumbai',
        'price': 5000
      }
      const spySearchService = spyOn(service, 'getOneWayFlights').and.callThrough();
      component.search(searchInfo);
      tick();
      expect(component.foundFlights.length).toBeGreaterThan(0);
      expect(component.mainOneWaySearch.length).toBeGreaterThan(0);
  }));
  it ('should get the Two way flight info', fakeAsync(() => {
    const searchInfo = {
      'startDate': 'Fri Aug 24 2018 00:00:00 GMT+0530 (IST) {}',
      'endDate': 'Fri Aug 25 2018 00:00:00 GMT+0530 (IST) {}',
      'origin': 'Delhi',
      'destination': 'Mumbai',
      'price': 5000
    }
    const spySearchService = spyOn(service, 'getTwoWayFlights').and.callThrough();
    component.search(searchInfo);
    tick();
    expect(component.mainTwoWaySearch.length).toBeGreaterThan(0);
    expect(component.secoundFlights.length).toBeGreaterThan(0);
  }));
  it('when search is called with error, foundFlights should be empty', fakeAsync(() => {
    spyOn(service, 'getOneWayFlights').and.returnValue(throwError(new Error ('Error: Failed to fetch Flights!')));
    const searchInfo = {
      'startDate': undefined,
      'origin': undefined,
      'destination': undefined,
      'price': undefined
    };
    component.search(searchInfo);
    tick();
    expect(component.mainOneWaySearch.length).toBe(0);
    expect(component.foundFlights.length).toBe(0);
  }));
  it('when search is called with error, secoundFlights should be empty', fakeAsync(() => {
    spyOn(service, 'getTwoWayFlights').and.returnValue(throwError(new Error ('Error: Failed to fetch Flights!')));
    const searchInfo = {
      'startDate': undefined,
      'endDate': undefined,
      'origin': undefined,
      'destination': undefined,
      'price': undefined
    };
    component.search(searchInfo);
    tick();
    expect(component.foundFlights.length).toBe(0);
    expect(component.mainOneWaySearch.length).toBe(0);
  }));
  it('should return one way flights based on price range selected and price should match mock data after filter', fakeAsync(() => {
    const range = [5000, 6000];
    component.foundFlights = [{
      arrivalTime : "5:00 AM",
      departureTime : "7:00 AM",
      destination : "Mumbai",
      id: "MO01",
      origin: "Delhi",
      price: 5000,
      returnDate: "18/09/2018",
      startDate: "18/09/2018"
    },
    {
      arrivalTime : "8:00 AM",
      departureTime : "9:00 AM",
      destination : "Mumbai",
      id: "MO06",
      origin: "Delhi",
      price: 4000,
      returnDate: "18/09/2018",
      startDate: "18/09/2018"
    },
    {
      arrivalTime : "9:00 AM",
      departureTime : "11:00 AM",
      destination : "Mumbai",
      id: "MO07",
      origin: "Delhi",
      price: 4000,
      returnDate: "18/09/2018",
      startDate: "18/09/2018"
    }]
    component.onRangeChange(range);
    tick();
    expect(component.mainOneWaySearch.length).toBeGreaterThan(0);
    expect(component.mainOneWaySearch[0].price).toBe(component.foundFlights[0].price);
  }));
  it('should return two way flights based on price range selected and price should match mock data after filter', fakeAsync(() => {
    const range = [5000, 8000];
    component.foundFlights = [{
      arrivalTime : "5:00 AM",
      departureTime : "7:00 AM",
      destination : "Mumbai",
      id: "MO01",
      origin: "Delhi",
      price: 5000,
      returnDate: "18/09/2018",
      startDate: "18/09/2018"
    },
    {
      arrivalTime : "8:00 AM",
      departureTime : "9:00 AM",
      destination : "Mumbai",
      id: "MO06",
      origin: "Delhi",
      price: 4000,
      returnDate: "18/09/2018",
      startDate: "18/09/2018"
    },
    {
      arrivalTime : "9:00 AM",
      departureTime : "11:00 AM",
      destination : "Mumbai",
      id: "MO07",
      origin: "Delhi",
      price: 4000,
      returnDate: "18/09/2018",
      startDate: "18/09/2018"
    }];
    component.secoundFlights = [{
      arrivalTime : "5:00 AM",
      departureTime : "7:00 AM",
      destination : "Delhi",
      id: "MO05",
      origin: "Mumbai",
      price: 5000,
      returnDate: "18/09/2018",
      startDate: "18/09/2018"
    },
    {
      arrivalTime : "8:00 AM",
      departureTime : "9:00 AM",
      destination : "Mumbai",
      id: "MO06",
      origin: "Delhi",
      price: 4000,
      returnDate: "18/09/2018",
      startDate: "18/09/2018"
    }];
    component.onRangeChange(range);
    tick();
    expect(component.mainTwoWaySearch.length).toBeGreaterThan(0);
    expect(component.mainOneWaySearch[0].price).toBe(component.foundFlights[0].price);
    expect(component.mainOneWaySearch.length).toBeGreaterThan(0);
    expect(component.mainTwoWaySearch[0].price).toBe(component.foundFlights[0].price);
  }));
  it('should set minDate for Return based on FirstDate selected', fakeAsync(() => {
    component.setEndDate(component.optionsStartDate.minDate);
    expect(component.optionsEndDate.minDate).toBeDefined();
  }));
});
