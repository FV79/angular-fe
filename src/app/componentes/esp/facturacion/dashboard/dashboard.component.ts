import { Component, OnInit, enableProdMode } from '@angular/core';
import { ServiceGraficaSem, ServicioDashboardService } from '../../../../servicios/dashboard/servicio-dashboard.service';
import { FacturacionFacturacionServicioService } from '../../../../servicios/facturacion/facturacion-facturacion-servicio.service';


if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ServiceGraficaSem]
})
export class DashboardComponent implements OnInit {
  cuenta = 50;
  gratis = 5;
  persona: string = 'Xmaz';
  dataSource: ServicioDashboardService[];

//factura
factura = new Factura('','','','');

  constructor(dataSemanal:ServiceGraficaSem,
    public _facturacionFacturacionServicioService:FacturacionFacturacionServicioService,) { 

    this.traerFacturas();
    this.dataSource = dataSemanal.getDataSemanal();
  }

  onPointClick(e) {
    e.target.select();
}

  ngOnInit() {
  }

 

    //Get facturas
    traerFacturas = async () => {
      try {
        let _facturaFE = await this._facturacionFacturacionServicioService.traerFacturas();
        this.factura = _facturaFE["_facturaNode"];    
        console.log('Facturacion', this.factura);  
      } catch (error) {
        console.log(error);
      }
    }

}


class Factura {
  constructor(
    public fac_cliente_nombre: string,
    public fac_cliente_RFC: string,
    public fac_oper_total: string,
    public fac_conf_status: string,
  ){}
}