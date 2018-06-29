import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class PredictService {

  constructor(private auth: AuthenticationService) { }

  predictPortfolio(arr) {
    var numMapping = {};
    var greatestFreq = 0;
    var result;
    arr.forEach(function findResult(number) {
      numMapping[number] = (numMapping[number] || 0) + 1;

      if (greatestFreq < numMapping[number]) {
        greatestFreq = numMapping[number];
        result = number;
      }
    });
    return +result;
  }

  predict(property?) {
    if(this.predictPortfolio(property)) return this.predictPortfolio(property);
    this.auth.predict(property).subscribe(result => console.log(result));
  }



}
