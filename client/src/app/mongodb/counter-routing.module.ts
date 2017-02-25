import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CounterComponent } from './counter.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'counter', component: CounterComponent }
    ])
  ]
})
export class CounterRoutingModule { }
