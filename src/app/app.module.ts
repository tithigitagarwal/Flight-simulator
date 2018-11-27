import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NouisliderModule } from 'ng2-nouislider';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchSearvice } from './searchService.mock';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgDatepickerModule,
    NouisliderModule
  ],
  providers: [SearchSearvice],
  bootstrap: [AppComponent]
})
export class AppModule { }
