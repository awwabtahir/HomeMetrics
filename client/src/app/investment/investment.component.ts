import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  properties;
  newprop;
  locations;
  types;
  amount;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.properties = this.dataService.getProperties();
    this.locations = this.dataService.getLocations();
    this.types = this.dataService.getPropertyTypes();
  }

  amountEntered() {
    console.log("amount");
    let amount = this.amount;
    let properties = this.properties;
    this.newprop = properties.filter(function (property) {
      return property.price == amount;
    });

    this.newprop.forEach(prop => {

      for(var i = 0; i < this.locations.length; i++) {
        if(prop.location == this.locations[i]._id) {
          prop.location = this.locations[i].location;
        }
      }

      for(var i = 0; i < this.types.length; i++) {
        if(prop.type == this.types[i]._id) {
          prop.type = this.types[i].type;
        }
      }

    });
    this.newprop = this.removeDuplicates(this.newprop);

    console.log(this.newprop);
  }

  removeDuplicates(myArr) {
    var flags = [], output = [], l = myArr.length, i;
    for (i = 0; i < l; i++) {
      if (flags[myArr[i].location]) continue;
      flags[myArr[i].location] = true;
      output.push(myArr[i]);
    }
    return output;
  }

}
