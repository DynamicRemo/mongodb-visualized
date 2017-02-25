import { NgModule } from '@angular/core';

import { CounterComponent } from './counter.component';
import { CounterRoutingModule } from './counter-routing.module';
import { MongoDBService } from './services/mongodb.service';
import { ChartModule }            from 'angular2-highcharts'; 

@NgModule({
  imports: [
    CounterRoutingModule,
    ChartModule,
  ],
  declarations: [
    CounterComponent
  ],
  providers: [
    MongoDBService,
  ]
})
export class CounterModule { }
