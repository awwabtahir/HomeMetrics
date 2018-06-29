import { DataService } from './../data.service';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  locations;
  properties;
  dealers;
  propertytypes;

  constructor(private auth: AuthenticationService, private dataService: DataService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.properties = localStorage.getItem("properties");
    this.locations = localStorage.getItem("locations");
    this.dealers = localStorage.getItem("dealers");
    this.propertytypes = localStorage.getItem("propertytypes");

    if(this.dataService.getProperties()) return;

    // Get Properties & Store in Data Service
    this.auth.getProperties().subscribe(properties => {
      this.dataService.setProperties(properties);
      this.properties = properties;
      console.log("Properties Added Successfully");
    });

    // Get Locations & Store in Data Service
    this.auth.getLocations().subscribe(locations => {
      this.dataService.setLocations(locations);
      this.locations = locations;
      console.log("Locations Added Successfully");
    });

    // Get Dealers & Store in Data Service
    this.auth.getDealers().subscribe(dealers => {
      this.dataService.setDealers(dealers);
      this.dealers = dealers;
      console.log("Dealers Added Successfully");
    });

    // Get PropertyTypes & Store in Data Service
    this.auth.getPropertyTypes().subscribe(propertytypes => {
      this.dataService.setPropertyTypes(propertytypes);
      this.propertytypes = propertytypes;
      console.log("PropertyTypes Added Successfully");
    });

  }

}
