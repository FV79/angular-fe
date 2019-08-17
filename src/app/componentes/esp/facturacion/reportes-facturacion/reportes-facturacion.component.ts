import { Component, OnInit,enableProdMode } from '@angular/core';
import { ReporteFacturacionServicioService, ServicioReporte } from '../../../../servicios/reportes/reporte-facturacion-servicio.service';

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}


@Component({
  selector: 'app-reportes-facturacion',
  templateUrl: './reportes-facturacion.component.html',
  styleUrls: ['./reportes-facturacion.component.css'],
  preserveWhitespaces: true,
  providers: [ ServicioReporte ]
})
export class ReportesFacturacionComponent {
  listaReportes: ReporteFacturacionServicioService[];

  constructor(service:ServicioReporte) {
   this.listaReportes = service.getlistaReportes();
 }

 

}
