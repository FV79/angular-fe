import { Component, OnInit, enableProdMode } from '@angular/core';
import { PruebaService, ServiceCliente } from '../../../../../servicios/pruebasDev/prueba.service';
import { DxPieChartModule } from 'devextreme-angular';


if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-reportes-clientes',
  templateUrl: './reportes-clientes.component.html',
  styleUrls: ['./reportes-clientes.component.css'],
  providers: [ServiceCliente]
})
export class ReportesClientesComponent implements OnInit {
  countries: PruebaService[];
  waterLandRatio: PruebaService[];

  constructor(service: ServiceCliente) {
      this.countries = service.getAreas();
      this.waterLandRatio = service.getLandWaterAreas();
  }

 

  ngOnInit() {
  }

}
