import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  properties;

  // Set 
  setProperties(properties) {
    this.properties = properties;
    localStorage.setItem("properties", JSON.stringify(properties));
  }

  // Get
  getProperties() {
    if(localStorage.getItem("properties")) return JSON.parse(localStorage.getItem("properties"));
    return this.properties;
  }

  locations;

  // Set 
  setLocations(locations) {
    this.locations = locations;    
    localStorage.setItem("locations", JSON.stringify(locations));
  }

  // Get
  getLocations() {
    console.log(JSON.parse(localStorage.getItem("locations")));
    if(localStorage.getItem("locations")) return JSON.parse(localStorage.getItem("locations"));
    return this.locations;
  }

  dealers;

  // Set 
  setDealers(dealers) {
    this.dealers = dealers;
    localStorage.setItem("dealers", JSON.stringify(dealers));
  }

  // Get
  getDealers() {
    if(localStorage.getItem("dealers")) return JSON.parse(localStorage.getItem("dealers"));
    return this.dealers;
  }

  propertytypes;

  // Set 
  setPropertyTypes(propertytypes) {
    this.propertytypes = propertytypes;
    localStorage.setItem("propertytypes", JSON.stringify(propertytypes));
  }

  // Get
  getPropertyTypes() {
    if(localStorage.getItem("propertytypes")) return JSON.parse(localStorage.getItem("propertytypes"));
    return this.propertytypes;
  }

  foundProperties;

  // Set 
  setFoundProperties(foundProperties) {
    this.foundProperties = foundProperties;
  }

  // Get
  getFoundProperties(): Observable<any> {
    return this.foundProperties;
  }

  proptype;

  // Set 
  setPropertyType(proptype) {
    this.proptype = proptype;
  }

  // Get
  getPropertyType() {
    return this.proptype;
  }

  location;

  // Set 
  setLocation(location) {
    this.location = location;
  }

  // Get
  getLocation(): Observable<any> {
    return this.location;
  }

  area;

  // Set 
  setArea(area) {
    this.area = area;
  }

  // Get
  getArea(): Observable<any> {
    return this.area;
  }

  userId;

  // Set 
  setUserId(userId) {
    this.userId = userId;
  }

  // Get
  getUserId(): Observable<any> {
    return this.userId;
  }
  
}
