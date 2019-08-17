import { Component, enableProdMode, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs'; // Angular 6 


if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
  selector: 'app-pueba-dev-express',
  templateUrl: './pueba-dev-express.component.html',
  styleUrls: ['./pueba-dev-express.component.css']
})
export class PuebaDevExpressComponent implements OnInit {
  


  constructor() {
    
  }

  ngOnInit() {
    
  }

  
}

