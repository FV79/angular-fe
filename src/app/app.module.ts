import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CounterModule } from 'ngx-counter';
import { ArchwizardModule } from 'angular-archwizard';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxLoadingModule } from 'ngx-loading';

import { DxChartModule } from 'devextreme-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { DxTextBoxModule, DxFileUploaderModule } from 'devextreme-angular';
import { DxDrawerComponent, DxDrawerModule, DxListModule, DxRadioGroupModule, DxToolbarModule } from 'devextreme-angular';
import { DxCheckBoxModule,DxSelectBoxModule,DxNumberBoxModule,DxButtonModule,DxFormModule,DxAutocompleteModule,DxFormComponent } from 'devextreme-angular';
import { DxAccordionModule, DxSliderModule, DxTagBoxModule } from 'devextreme-angular';
import {DxButtonGroupModule} from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { DxPieChartModule } from 'devextreme-angular';
import { DxTabPanelModule, DxTemplateModule } from 'devextreme-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XmazFacturacionInicioComponent } from './componentes/esp/xmaz-facturacion-inicio/xmaz-facturacion-inicio.component';
import { XmazFacturacionLoginComponent } from './componentes/esp/xmaz-facturacion-login/xmaz-facturacion-login.component';
import { XmazFacturacionPreciosComponent } from './componentes/esp/xmaz-facturacion-precios/xmaz-facturacion-precios.component';
import { XmazFacturacionContactoComponent } from './componentes/esp/xmaz-facturacion-contacto/xmaz-facturacion-contacto.component';
import { MenuComponent } from './componentes/esp/general/menu/menu.component';
import { FooterComponent } from './componentes/esp/general/footer/footer.component';
import { PrivacidaComponent } from './componentes/esp/general/privacida/privacida.component';
import { AdminComponent } from './componentes/esp/admin/admin.component';
import { XmazAdminComponent } from './componentes/esp/xmaz-admin/xmaz-admin.component';
import { PuebaDevExpressComponent } from './componentes/esp/pueba-dev-express/pueba-dev-express.component';
import { ConsultaClienteComponent } from './componentes/esp/facturacion/clientes/consulta-cliente/consulta-cliente.component';
import { AltamodificacionClienteComponent } from './componentes/esp/facturacion/clientes/altamodificacion-cliente/altamodificacion-cliente.component';
import { ServiceConsultaCliente } from './servicios/cliente/consulta-cliente.service';
import { EmpresaAltaComponent } from './componentes/esp/facturacion/empresa/empresa-alta/empresa-alta.component';
import { ClientesFacturcionComponent } from './componentes/esp/facturacion/clientes/clientes-facturcion/clientes-facturcion.component';
import { DashboardComponent } from './componentes/esp/facturacion/dashboard/dashboard.component';
import { ReportesFacturacionComponent } from './componentes/esp/facturacion/reportes-facturacion/reportes-facturacion.component';
import { PaquetesFacturacionComponent } from './componentes/esp/facturacion/paquetes-facturacion/paquetes-facturacion.component';
import { AddendasFacturacionComponent } from './componentes/esp/facturacion/addendas-facturacion/addendas-facturacion.component';
import { NominasFacturacionComponent } from './componentes/esp/facturacion/nominas-facturacion/nominas-facturacion.component';
import { CuentaUsuarioFacturacionComponent } from './componentes/esp/facturacion/cuenta-usuario-facturacion/cuenta-usuario-facturacion.component';
import { AyudaFacturacionComponent } from './componentes/esp/facturacion/ayuda-facturacion/ayuda-facturacion.component';
import { FacturacionFacturacionComponent } from './componentes/esp/facturacion/facturacion-facturacion/facturacion-facturacion.component';
import { SliderPublicidadComponent } from './componentes/esp/facturacion/extras/slider-publicidad/slider-publicidad.component';
import { ProductosFacturacionComponent } from './componentes/esp/facturacion/productos-facturacion/productos-facturacion.component';
import { RegistroComponent } from './componentes/esp/facturacion/registro/registro.component';
import { EmpresaInicioComponent } from './componentes/esp/facturacion/empresa/empresa-inicio/empresa-inicio.component';
import { UnidadMedidaSatComponent } from './componentes/esp/facturacion/unidad-medida-sat/unidad-medida-sat.component';
import * as $ from 'jquery';
import { ModalAutomaticoComponent } from './componentes/esp/general/modal-automatico/modal-automatico.component';
import { ReportesClientesComponent } from './componentes/esp/facturacion/extras/reportes-clientes/reportes-clientes.component';
import { ReportesFacturaComponent } from './componentes/esp/facturacion/extras/reportes-factura/reportes-factura.component';
import { ReportesProductosComponent } from './componentes/esp/facturacion/extras/reportes-productos/reportes-productos.component';
import { BotonesComponent } from './componentes/esp/facturacion/extras/botones/botones.component';
import { LoadingComponent } from './componentes/esp/facturacion/extras/loading/loading.component';
import { ProductosFactComponent } from './componentes/esp/facturacion/productos-fact/productos-fact.component'; 


@NgModule({
  declarations: [
    AppComponent,
    XmazFacturacionInicioComponent,
    XmazFacturacionLoginComponent,
    XmazFacturacionPreciosComponent,
    XmazFacturacionContactoComponent,
    MenuComponent,
    FooterComponent,
    PrivacidaComponent,
    AdminComponent,
    XmazAdminComponent,
    PuebaDevExpressComponent,
    ConsultaClienteComponent,
    AltamodificacionClienteComponent,
    EmpresaAltaComponent,
    ClientesFacturcionComponent,
    DashboardComponent,
    ReportesFacturacionComponent,
    PaquetesFacturacionComponent,
    AddendasFacturacionComponent,
    NominasFacturacionComponent,
    CuentaUsuarioFacturacionComponent,
    AyudaFacturacionComponent,
    FacturacionFacturacionComponent,
    SliderPublicidadComponent,
    ProductosFacturacionComponent,
    RegistroComponent,
    EmpresaInicioComponent,
    UnidadMedidaSatComponent,
    ModalAutomaticoComponent,
    ReportesClientesComponent,
    ReportesFacturaComponent,
    ReportesProductosComponent,
    BotonesComponent,
    LoadingComponent,
    ProductosFactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CounterModule.forRoot(),
    DxDrawerModule,
    DxListModule,
    DxRadioGroupModule,
    DxToolbarModule,
    DxButtonGroupModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxAutocompleteModule,
    DxFormModule,
    DxTextBoxModule, 
    DxFileUploaderModule,
    BrowserModule,
    DxTabPanelModule,
    DxCheckBoxModule,
    DxTemplateModule,
    DxAccordionModule,
    DxSliderModule, 
    DxTagBoxModule,
    DxChartModule,
    ArchwizardModule,
    DxPieChartModule,
    TextMaskModule,
    NgxLoadingModule.forRoot({      
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
  })
  ],
  providers: [
    ServiceConsultaCliente
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
