import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {
  id: number;
  text: string = 'inicio';
  icon: string;

  
}


@Injectable()
export class ServiceAdmin {
  text: string;

  navigation = [
    { id: 1, text: "Inicio", icon: "fa fa-home" },
    { id: 2, text: "Empresa", icon: "fa fa-building" },
    { id: 3, text: "Clientes", icon: "fa fa-users" },
    { id: 4, text: "Facturacion", icon: "fa fa-file-o" },
    { id: 5, text: "Nominas", icon: "fa fa-file-o" },
    { id: 6, text: "Addendas", icon: "fa fa-file-code-o" },
    { id: 7, text: "Productos", icon: "fa fa-barcode" },
    { id: 8, text: "Reporte", icon: "fa fa-bar-chart" },
    { id: 9, text: "Folios", icon: "fa fa-money" },
    { id: 10, text: "Cuenta", icon: "fa fa-user" },
    { id: 11, text: "Ayuda", icon: "fa fa-question" },
    { id: 12, text: "Cerrar Sesion", icon: "fa fa-times" }
  ];
    getNavigationList(): AdminPanelService[] {
        return this.navigation;
    }


    mostrarCatalogo(nombreCatalogo) {
      this.text = nombreCatalogo;
      return this.text;
    }
}

