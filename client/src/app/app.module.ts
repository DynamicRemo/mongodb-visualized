import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { ChartModule } from 'angular2-highcharts';

import { AppRoutingModule }     from './app-routing.module';
import { MongoDBService } from './mongodb/services/mongodb.service';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
  	HttpModule, 
  	ChartModule, 
  	AppRoutingModule, 
	],
  declarations: [ 
  	AppComponent, 
	],
  providers: [
    MongoDBService,
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
