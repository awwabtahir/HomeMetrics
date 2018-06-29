import { DataService } from './../data.service';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { PredictService } from '../predict.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  userId;
  properties;
  foundProperties;
  foundProperties1;
  proptypes;
  locations;

  property = {
    location: "",
    price: "",
    beds: "",
    size: "",
    type: "",
    addedTime: "",
    addedBy: ""
  }


  constructor(
    private auth: AuthenticationService, 
    private dataService: DataService,
    private predictService: PredictService) { }

  ngOnInit() {

    this.userId = this.auth.getUserDetails()._id;
    this.property.addedBy = this.userId;
    this.locations = this.dataService.getLocations();
    this.proptypes = this.dataService.getPropertyTypes();

    this.properties = this.dataService.getProperties();
    this.foundProperties = this.getProperties(this.properties);
    this.foundProperties1 = this.setProps(this.foundProperties);

  }

  addProperty() {

    this.auth.addProperty(this.property).subscribe(() => {
      console.log("Property added successfully");
    }, (err) => {
      console.error(err);
    });
    let property = this.property;
    this.foundProperties.push(property);
    this.foundProperties1 = this.setProps(this.foundProperties);

    // Get Properties & Store in Data Service
    let dataService = this.dataService;
    this.auth.getProperties().subscribe(properties => {
      dataService.setProperties(properties);
      console.log("Properties Added Successfully");
    }, (err) => {
      console.error(err);
    });
  }

  getProperties(props) {
    let userId = this.userId;
    let foundProps = props;
    foundProps = foundProps.filter(function (property) {
      return property.addedBy == userId;
    });
    return foundProps;
  }

  setProps(property) {
    let props = property;
    let locations = this.locations;
    let types = this.proptypes;
    

    props.forEach(prop => {
      let properties = this.properties;

      properties = properties.filter(function (property) {
        return property.location == prop.location;
      });

      properties = properties.filter(function (property) {
        return property.type == prop.type;
      });

      let priceArr = [];
      for (let i = 0; i < properties.length; i++) {
        priceArr.push(parseInt(properties[i].price));
      }

      prop.roi = this.predictService.predictPortfolio(priceArr);

      for (let i = 0; i < locations.length; i++) {
        if (prop.location == locations[i]._id) {
          prop.location = locations[i].location;
        }
      }

      for (let i = 0; i < types.length; i++) {
        if (prop.type == types[i]._id) {
          prop.type = types[i].type;
        }
      }

    });

    return props;
  }

}
