import { Component, enableProdMode, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs'; // Angular 6 

import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;


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

// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  label: string;
  labelClass: string;
  extralink: boolean;
  submenu : RouteInfo[];
}
