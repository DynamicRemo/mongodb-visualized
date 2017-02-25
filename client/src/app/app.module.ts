import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';
import { CounterModule }  from './mongodb/counter.module';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
  	HttpModule, 
  	AppRoutingModule, 
    CounterModule
	],
  declarations: [ 
  	AppComponent, 
	],
  providers: [
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
