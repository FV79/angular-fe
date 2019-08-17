import { Component, enableProdMode, OnInit } from '@angular/core';
import { ServiceConsultaCliente } from '../../../../../servicios/cliente/consulta-cliente.service';
import { HttpClient } from "@angular/common/http";


if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}
@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css'],
  providers: [ServiceConsultaCliente]
})
export class ConsultaClienteComponent implements OnInit {
  saleAmountHeaderFilter: any;
  applyFilterTypes: any;
  currentFilter: any;
  showFilterRow: boolean;
  showHeaderFilter: boolean;
    

  constructor(serviceConsultaCliente: ServiceConsultaCliente, public httpClient:HttpClient) {
    this.httpClient.get('http://localhost:3000/clientes',{
           responseType:'json'
       })
       .subscribe((clientes => {
       this.httpClient=clientes["clientes"];
        console.log('Traer clientes', this.httpClient);        
       }))

       this.showFilterRow = true;
       this.showHeaderFilter = true;
   }

  ngOnInit() {
  }

}
