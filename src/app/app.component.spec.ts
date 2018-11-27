import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchSearvice } from './searchService.mock';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NouisliderModule } from 'ng2-nouislider';
import { FormsModule }   from '@angular/forms';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchComponent
      ],
      providers: [
        SearchSearvice
      ],
      imports: [
        FormsModule,
        NouisliderModule,
        NgDatepickerModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render app-search tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    expect(compiled).not.toBeNull();
  }));
});
