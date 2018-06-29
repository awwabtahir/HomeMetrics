import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  locations = [];
  properties = [];
  propertytypes = [];

  propTypeId = 0;
  foundProperties;
  foundLocations = [];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
      this.locations = this.dataService.getLocations();
      this.properties = this.dataService.getProperties();
      this.propertytypes = this.dataService.getPropertyTypes();
  }

  onTypeChange() {

    let propTypeId = this.propTypeId;
    this.foundProperties = null;
    this.foundLocations = [];

    this.foundProperties = this.properties.filter(function (property) {
      return property.type == propTypeId;
    });

    this.foundProperties = this.removeDuplicates(this.foundProperties, "location");

    for (var i = 0; i < this.foundProperties.length; i++) {
      for (var j = 0; j < this.locations.length; j++) {
        if (this.foundProperties[i].location == this.locations[j]._id) {
          this.foundLocations.push(this.locations[j]);
        }
      }
    }

    this.foundLocations = this.removeDuplicates(this.foundLocations, "location");
    console.log(this.foundLocations);


  }

  locBtnClicked(locId) {
    let foundProperties = [];
    let proptype;
    let location;

    // for Found Properties
    let propTypeId = this.propTypeId;

    this.foundProperties = null;
    this.foundProperties = this.properties.filter(function (property) {
      return property.type == propTypeId;
    });

    for (var i = 0; i < this.foundProperties.length; i++) {
      for (var j = 0; j < this.locations.length; j++) {
        if (this.foundProperties[i].location == this.locations[j]._id) {
          foundProperties.push(this.foundProperties[i]);
        }
      }
    }

    // for Property Type
    proptype = this.propertytypes.filter(function (type) {
      return type._id == propTypeId;
    });

    // for Location
    location = this.locations.filter(function (location) {
      return location._id == locId;
    });

    this.dataService.setFoundProperties(foundProperties);
    this.dataService.setPropertyType(proptype);
    this.dataService.setLocation(location);

    // this.router.navigateByUrl('/detail');
  }

  areaClicked(area) {
    this.dataService.setArea(area);
    this.router.navigateByUrl('/detail');
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

}
