import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xmaz-facturacion-contacto',
  templateUrl: './xmaz-facturacion-contacto.component.html',
  styles: []
})
export class XmazFacturacionContactoComponent implements OnInit {

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