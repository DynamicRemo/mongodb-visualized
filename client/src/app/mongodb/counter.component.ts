import { Component } from '@angular/core';
import { MongoDBService } from './services/mongodb.service';

@Component({
  selector: 'counter',
  styles: [`
    chart {
      display: block;
    }
    button {
      display: block;
      width: 100%;
      height: 25px;
    }
  `],
  template:  `<chart [options]="options" (load)="saveChart($event.context)">
								<series (hide)="onSeriesHide($event.context)">
									<point (select)="onPointSelect($event.context)"></point>
								</series>
							</chart>`,
})
export class CounterComponent  { 
  nameChart = 'MongoDB Document Counter'; 
  options: Object;
  chart: any;
  seriesOptions = new Array();
  
  constructor(private _MongoDBService:MongoDBService) {
    
    this.options = {
        title : { text : this.nameChart },
        series: this.seriesOptions
    };
    this.initiateGraph();
    var classInstance = this;
    setInterval(function(){
      classInstance._MongoDBService.getAllCollectionsCount()
      .subscribe(
        countArray => {
          classInstance.addGraphPoint(countArray);
        }
      );
    }, 2000);
  }


  initiateGraph(){

    this._MongoDBService.getAllCollections()
      .subscribe(
        collectionsArray => {
          var index = 0;
          // collection: any;
          for(let collection of collectionsArray){
            console.log(collection["name"]);
            this.seriesOptions[index] = {
              name : collection["name"],
              data : [0],
              allowPointSelect: true
            };
            index++;
          }
        }
      );
     
    var currentInstance = this;
    var chartDelay = setInterval(function(){       
      console.log("seriesOptions");
      console.dir(currentInstance.seriesOptions);
      currentInstance.options = {
          title : { text : 'MongoDB Document Counter' },
          series: currentInstance.seriesOptions
      };
      console.log("Options");
      console.dir(currentInstance.options);
      clearInterval(chartDelay);
    }, 1000);

  }

  addGraphPoint(countArray: Object){
    this.chart.series[0].addPoint( countArray['0'] );
    this.chart.series[1].addPoint( countArray['1'] );
    this.chart.series[2].addPoint( countArray['2'] );
  }
  
  saveChart(chart: Object) {
    this.chart = chart;
  }

  addPoint() {
    this.chart.series[0].addPoint(Math.random() * 10);
    this.chart.series[1].addPoint(Math.random() * -10);
    this.chart.series[2].addPoint(Math.random() * 3);
  }

  onPointSelect(point: any) {
    alert(`${point.y} is selected`);
  }

  onSeriesHide(series: any) {
    alert(`${series.name} is selected`);
  }
}
