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
  addNewPointObject: Object;
  
  constructor(private _MongoDBService:MongoDBService) {
    
    this.options = {
        title : { text : this.nameChart },
        series: this.seriesOptions
    };

    this.initiateGraph();
  }

  initiateFetchingLoop(){
    this.addNewPointObject = Object;

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
          if(collectionsArray.length !== clcCountInstance.seriesOptions.length){
            console.log("Collection(s) Modified, Initiating Graph!");
            clearInterval(docCountInterval);
            clearInterval(clcCountInterval);
            clcCountInstance.initiateGraph();
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
      console.log(currentInstance.seriesOptions);
      
      currentInstance.options = {
          title : { text : 'MongoDB Document Counter' },
          series: currentInstance.seriesOptions
      };

      currentInstance.initiateFetchingLoop();
      clearInterval(chartDelay);
    }, 1000);

  }

  addGraphPoint(countArray: Object){

    if( JSON.stringify(this.addNewPointObject) !== JSON.stringify(countArray)  ){
      var ind = 0;
      for(var objAttr in countArray){
        if(ind < this.seriesOptions.length){
          this.chart.series[objAttr].addPoint( countArray[objAttr] );
          ind++;
        }
      }
      this.addNewPointObject = countArray; 
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
