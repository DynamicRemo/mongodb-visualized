import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  styles: [``],
  template: ` <h1>VisualizED {{name}}</h1>
              <router-outlet></router-outlet>
  `,
})
export class AppComponent  { 
  name = 'MongoDB'; 

  constructor() {}
}
