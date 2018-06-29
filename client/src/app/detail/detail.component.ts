import { DataService } from './../data.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { PredictService } from '../predict.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit {

  properties;
  propType;
  location;
  area;
  time;
  price;
  futurePrice = [];
  predictPrice = 0;
  dealers;

  constructor(private dataService: DataService, private predictService: PredictService) { }

  ngOnInit() {
    this.properties = this.dataService.getFoundProperties();
    let area = this.dataService.getArea();
    this.area = area;
    this.properties = this.properties.filter(function (prop) {
      return prop.size == area;
    });
    // sorting properties based on added time
    this.properties.sort(function (a, b) {
      return b.addedTime - a.addedTime;
    });
    this.properties = this.removeOutliers(this.removeDuplicates(this.properties));
    console.log(this.properties);

    this.propType = this.dataService.getPropertyType();
    this.location = this.dataService.getLocation();
    let locationId = this.location[0]._id;

    this.time = this.properties.map(res => res.addedTime);
    this.price = this.properties.map(res => res.price);

    this.price.forEach(p => {
      this.futurePrice.push(p * (Math.random() + 1));
    });

    this.dealers = this.dataService.getDealers();
    this.dealers = this.dealers.filter(function (dealer) {
      return dealer.location == locationId;
    });
    this.dealers = this.dealers.slice(0, 5);

    this.predictService.predict(this.properties);
  }

  canvas: any;
  ctx: any;

  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.time,
        datasets: [{
          label: this.propType[0].type + ' Price (Lacs) in ' + this.area + ' Marla at ' + this.location[0].location,
          data: this.price,
          borderColor: '#3cba9f'
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });
  }

  removeDuplicates(myArr) {
    var flags = [], output = [], l = myArr.length, i;
    for (i = 0; i < l; i++) {
      if (flags[myArr[i].addedTime]) continue;
      flags[myArr[i].addedTime] = true;
      output.push(myArr[i]);
    }
    return output;
  }

  removeOutliers(myArr) {
    var l = myArr.length;
    var low = Math.round(l * 0.025);
    var high = l - low;
    var arr2 = myArr.slice(low, high);
    return arr2;
  }

  pPrice;
  future() {
    this.predictPrice = this.pPrice + (this.pPrice * 1.25);
    this.predictService.predict(this.properties);
  }

}
