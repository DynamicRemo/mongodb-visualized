import { Component } from '@angular/core';
import { MongoDBService } from './services/mongodb.service';

@Component({
  selector: 'counter',
  templateUrl: 'app/mongodb/counter.component.html',
  styleUrls: ['app/mongodb/counter.component.css'],
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
    this.initiateFetchingLoop();
  }

  initiateFetchingLoop(){
    var docCountInstance = this;
    var docCountInterval = setInterval(function(){
      docCountInstance._MongoDBService.getAllCollectionsCount()
      .subscribe(
        countArray => {
          docCountInstance.addGraphPoint(countArray);
        }
      );
    }, 2000);
    

    var clcCountInstance = this;
    var clcCountInterval = setInterval(function(){
      clcCountInstance._MongoDBService.getAllCollections()
      .subscribe(
        collectionsArray => {
          console.log("Current Collection Counts: " + clcCountInstance.seriesOptions.length);
          console.log("Fetched Collection Counts: " + collectionsArray.length);

          if(collectionsArray.length !== clcCountInstance.seriesOptions.length){
            console.log("Collections Modified, Initiating Graph!");
            clearInterval(docCountInterval);
            clearInterval(clcCountInterval);
            clcCountInstance.initiateGraph();
            clcCountInstance.initiateFetchingLoop();
          }
        }
      );
      
    }, 10000);
  }

  initiateGraph(){

    this._MongoDBService.getAllCollections()
      .subscribe(
        collectionsArray => {
          this.seriesOptions = [];
          var index = 0;
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
      console.log("Series Options");
      console.dir(currentInstance.seriesOptions);
      currentInstance.options = {
          title : { text : 'MongoDB Document Counter' },
          series: currentInstance.seriesOptions
      };
      // console.log("Options");
      // console.dir(currentInstance.options);
      clearInterval(chartDelay);
    }, 1000);

  }

  addGraphPoint(countArray: Object){
    for(var objAttr in countArray){
      this.chart.series[objAttr].addPoint( countArray[objAttr] );
    }
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
