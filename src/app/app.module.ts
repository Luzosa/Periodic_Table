import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PeriodicTableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{path: '', component: PeriodicTableComponent, pathMatch: 'full'}])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
