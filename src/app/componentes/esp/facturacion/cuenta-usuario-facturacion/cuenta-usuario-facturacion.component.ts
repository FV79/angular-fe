import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta-usuario-facturacion',
  templateUrl: './cuenta-usuario-facturacion.component.html',
  styleUrls: ['./cuenta-usuario-facturacion.component.css']
})
export class CuentaUsuarioFacturacionComponent implements OnInit {
//pestañas
pestanasCuenta =[{
  id:1,
  nombrePestanaCuenta:'Cambiar Contraseña'
},
{
  id:2,
  nombrePestanaCuenta:'Promociones'
},
{
  id:3,
  nombrePestanaCuenta:'Contactar Xmaz'
}]

  constructor() { }

  ngOnInit() {
  }

}
