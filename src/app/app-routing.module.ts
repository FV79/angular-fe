import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XmazFacturacionInicioComponent } from './componentes/esp/xmaz-facturacion-inicio/xmaz-facturacion-inicio.component';
import { XmazFacturacionPreciosComponent } from './componentes/esp/xmaz-facturacion-precios/xmaz-facturacion-precios.component';
import { XmazFacturacionLoginComponent } from './componentes/esp/xmaz-facturacion-login/xmaz-facturacion-login.component';
import { XmazFacturacionContactoComponent } from './componentes/esp/xmaz-facturacion-contacto/xmaz-facturacion-contacto.component';
import { PrivacidaComponent } from './componentes/esp/general/privacida/privacida.component';
import { XmazAdminComponent } from './componentes/esp/xmaz-admin/xmaz-admin.component';
import { PuebaDevExpressComponent } from './componentes/esp/pueba-dev-express/pueba-dev-express.component';
import { RegistroComponent } from "./componentes/esp/facturacion/registro/registro.component";

const APP_ROUTES: Routes = [
  { path: 'xmazFacturacionInicio', component: XmazFacturacionInicioComponent },
  { path: 'xmazFacturacionPrecios', component: XmazFacturacionPreciosComponent },
  { path: 'xmazFacturacionLogin', component: XmazFacturacionLoginComponent },
  { path: 'xmazFacturacionContacto', component: XmazFacturacionContactoComponent },
  { path: 'xmazAvisoPrivacidad', component: PrivacidaComponent },

  { path: 'XmazAdmin', component: XmazAdminComponent },
  { path: 'XmazRegistro', component: RegistroComponent },
  { path: 'xmazPruebaDev', component: PuebaDevExpressComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'xmazFacturacionInicio' }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, { useHash: true});

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
