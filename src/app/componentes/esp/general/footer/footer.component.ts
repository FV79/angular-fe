import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  links : any[]= ["Cuerpo del mensaje"];
  mailText:string = "";

  constructor() { }

  location = {
    phoneNumber: 6691553264,
  }

  ngOnInit() {
    // mailto Correo
    this.mailText = "mailto:dbautista@xmaz.mx?subject=files&body="+this.links.join(" ,");
  }
}