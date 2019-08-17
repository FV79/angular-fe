import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda-facturacion',
  templateUrl: './ayuda-facturacion.component.html',
  styleUrls: ['./ayuda-facturacion.component.css']
})
export class AyudaFacturacionComponent implements OnInit {
//pestañas
pestanasAyuda =[{
  id:1,
  nombrePestanaAyuda:'Videos Youtube'
},
{
  id:2,
  nombrePestanaAyuda:'Manual PDF'
}]

  constructor() { }

  ngOnInit() {
  }

}
