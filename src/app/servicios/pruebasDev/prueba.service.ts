import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PruebaService {
  name: string;
  area: number;
   
  constructor() { }
}



let countries: PruebaService[] = [{
  name: "Russia",
  area: 0.12
}, {
      name: "Canada",
      area: 0.07
  }, {
      name: "USA",
      area: 0.07
  }, {
      name: "China",
      area: 0.07
  }, {
      name: "Brazil",
      area: 0.06
  }, {
      name: "fernando",
      area: 0.05
  }, {
      name: "India",
      area: 0.02
  }, {
      name: "Others",
      area: 0.55
  }];

let waterLandRatio: PruebaService[] = [{
      name: 'Land',
      area: 0.33
},{
      name: 'Water',
      area: 0.33
  }
    ,{
      name: 'floot',
      area: 0.33
  }];


@Injectable()
export class ServiceCliente {
  getAreas(): PruebaService[] {
    return countries;
}

getLandWaterAreas(): PruebaService[] {
    return waterLandRatio;
}
   

}


