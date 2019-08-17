import { NgModule, Component, ViewChild, enableProdMode, OnInit } from '@angular/core';
import { DxDrawerComponent } from 'devextreme-angular';
import { ServiceAdmin, AdminPanelService } from '../../../servicios/admin/admin-panel.service';
import { AutentificacionService } from "../../../servicios/token/autentificacion.service";
import { EmpresaFacturacionServicioService } from "../../../servicios/empresa/empresa-facturacion-servicio.service";
import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
import { RegimenFiscalService } from '../../../servicios/sat/regimen-fiscal.service';


declare var $:any;



if (!/localhost/.test(document.location.host)) {
    enableProdMode();
}
@Component({
  selector: 'app-xmaz-admin',
  templateUrl: './xmaz-admin.component.html',
  styleUrls: ['./xmaz-admin.component.css'],
  providers: [ServiceAdmin],
  preserveWhitespaces: true
})
export class XmazAdminComponent implements OnInit {
  listaEstado: string[] = [
    'Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Ciudad de México','Coahuila de Zaragoza','Colima','Durango','Estado de México','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacan','Morelos','Nayarit',' Nuevo León','Oaxaca','Puebla','Queretaro','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz','Zacatecas','Zacatecas'];
  @ViewChild(DxDrawerComponent) drawer: DxDrawerComponent;
  navigation: AdminPanelService[];
  showSubmenuModes: string[] = ['slide', 'expand'];
  positionModes: string[] = ['left', 'right'];
  showModes: string[] = ['push', 'shrink', 'overlap'];
  text: string = 'Inicio';
  regimenFiscal = new RegimenFiscal('','','');
  
  selectedOpenMode: string = 'shrink';
  selectedPosition: string = 'left';
  selectedRevealMode: string = 'slide';
  elementAttr: any;
  empresa = new Empresa('','','','','','','','','','','','','','',null,'','');
  configuracion = new Configuracion(null,null,'','','','','')
  
  constructor(private service: ServiceAdmin,private autentificacionService:AutentificacionService,private router:Router,private empresaFacturacionServicioService:EmpresaFacturacionServicioService,public toastr: ToastrManager,
    private _regimenFiscalService:RegimenFiscalService) {
  
    this.traerRegimenFiscal();
    this.autentificacionService.validaToken()
    .then((response) => {
    this.empresaFacturacionServicioService.getEmpresaLogin()
    .then((empresa) => {
      
      this.empresa = empresa["empresa"]
      this.configuracion = empresa["configuracion"];
      console.log('Datos de la empresa',this.empresa,this.configuracion)
      if(this.empresa.emp_nomempresa == null || this.empresa.emp_nomempresa == '' ||
       this.empresa.emp_direccion == null || this.empresa.emp_direccion == '' ||
       this.empresa.emp_numInt == null || this.empresa.emp_numInt == '' ||
       this.empresa.emp_numExt == null || this.empresa.emp_numExt == '' ||
       this.empresa.emp_colonia == null || this.empresa.emp_colonia == '' ||
       this.empresa.emp_rfc == null || this.empresa.emp_rfc == '' ||
       this.empresa.emp_localidad == null || this.empresa.emp_localidad == '' ||
       this.empresa.emp_municipio == null || this.empresa.emp_municipio == '' ||
       this.empresa.emp_estado == null || this.empresa.emp_estado == '' ||
       this.empresa.emp_pais == null || this.empresa.emp_pais == '' ||
       this.empresa.emp_telefono == null || this.empresa.emp_telefono == '' ||
       this.empresa.emp_cp == null || this.empresa.emp_cp == '' ||
       this.empresa.emp_email == null || this.empresa.emp_email == ''  ||
       this.empresa.emp_logo == null ||
       this.empresa.emp_regimenfiscal_codigo == null || this.empresa.emp_regimenfiscal_codigo == '' ||
       this.empresa.emp_razonsocial == null || this.empresa.emp_razonsocial == '' ||
       this.configuracion.emp_certificado == null || this.configuracion.emp_certificado == '' ||
       this.configuracion.emp_llave == '' || this.configuracion.emp_llave == null  ||
       this.configuracion.emp_licencia == '' || this.configuracion.emp_licencia == null  ||
       this.configuracion.emp_password == '' || this.configuracion.emp_password == null ||
       this.configuracion.emp_rutaxml == '' || this.configuracion.emp_rutaxml == null 
        ){
        $("#modalEmpresa").modal();
      } 
    })
    .catch((error) => {
      console.log('Error de empresa',error);
    })
  })
  .catch((err) => {
   this.router.navigate(['/xmazFacturacionLogin'])
   this.toastr.errorToastr('Error','No puedes entrar sin Iniciar Sesion.')
   console.log('validado no puedes entrar sin inisia sesion');
  })
    this.navigation = service.getNavigationList();
}

mostrarCatalogo(catalogo) {
  this.text = this.service.mostrarCatalogo(catalogo);
}

//funcion cerrar sesion
cerrarSesion() {
  window.localStorage.removeItem('token')
  this.router.navigate(['/xmazFacturacionLogin'])
  this.toastr.successToastr('Exito', 'Se ha cerrado sesion')
  console.log('Se ha cerrado sesion, se removio el token');
}

//Funcion buscar empresa
buscarEmpresaPorId = async(id) => {
 try {
 let empresa = this.empresaFacturacionServicioService.findEmpresaById(id)
 console.log(empresa);
 } catch (error) {
    console.log('Erro al buscar empresa',error);
 }
}

toolbarContent = [{
  widget: 'dxButton',
  location: 'before',
  options: {
      icon: 'menu',
      onClick: () => this.drawer.instance.toggle()
  }
}];

getModuleName(modulo) {
console.log('Modulo',modulo);
}

  ngOnInit() {    
  }

  //cargar logo
  onFileChange() {
    let imagen:any = document.getElementById("imagePreview")
    let archivos:any = document.getElementById("file")
    let reader = new FileReader();
    reader.onloadend=()=> {
      imagen.src = reader.result
      this.empresa.emp_logo = archivos.files[0]
      console.log('Archivo de logo',archivos.files[0]);
    }
   reader.readAsDataURL(archivos.files[0]);
   }

   //Cargar llave
   onLlaveChange() {
    let archivos:any = document.getElementById("llave")
    let reader = new FileReader();
    reader.onloadend=()=> {
      this.configuracion.emp_llave = archivos.files[0]
      console.log('Llave',archivos.files[0]);
    }
   reader.readAsDataURL(archivos.files[0]);
   }

   // Cargar Certificado
   onCertificadoChange() {
    let archivos:any = document.getElementById("certificado")
    let reader = new FileReader();
    reader.onloadend=()=> {
       this.configuracion.emp_certificado = archivos.files[0]
      console.log('Certificado',archivos.files[0]);
    }
   reader.readAsDataURL(archivos.files[0]);
   }

   //Actualizar empresa
  actualizarEmpresa = async() =>{
    let archivo:FormData = new FormData();
    archivo.append('logo',this.empresa.emp_logo)
    archivo.append('llave',this.configuracion.emp_llave)
    archivo.append('certificado',this.configuracion.emp_certificado)
    archivo.append('emp_password',this.configuracion.emp_password)
    archivo.append('emp_licencia',this.configuracion.emp_licencia)
    archivo.append('emp_nomempresa',this.empresa.emp_nomempresa)
    archivo.append('emp_direccion',this.empresa.emp_direccion)
    archivo.append('emp_numInt',this.empresa.emp_numInt)
    archivo.append('emp_numExt',this.empresa.emp_numExt)
    archivo.append('emp_colonia',this.empresa.emp_colonia)
    archivo.append('emp_rfc',this.empresa.emp_rfc)
    archivo.append('emp_localidad',this.empresa.emp_localidad)
    archivo.append('emp_municipio',this.empresa.emp_municipio)
    archivo.append('emp_estado',this.empresa.emp_estado)
    archivo.append('emp_pais',this.empresa.emp_pais)
    archivo.append('emp_telefono',this.empresa.emp_telefono)
    archivo.append('emp_cp',this.empresa.emp_cp)
    archivo.append('emp_email',this.empresa.emp_email)
    archivo.append('emp_tipo_factura',this.empresa.emp_tipo_factura)
    archivo.append('emp_codempresa',this.empresa.emp_codempresa)
    archivo.append('emp_razonsocial',this.empresa.emp_razonsocial)
    archivo.append('emp_regimenfiscal_codigo',this.empresa.emp_regimenfiscal_codigo)

    try {
      let empAct = await this.empresaFacturacionServicioService.actualizar(archivo) 
      console.log(empAct);
      this.empresa = empAct["empresa"];
      this.configuracion = empAct["configuracion"];
      window.localStorage.setItem('token',empAct["token"])
      $("#modalEmpresa").modal('hide');
      this.toastr.successToastr('Se actualizo la empresa', 'Exito!');      
    } catch (error) {
      console.log('Error al actualizar la empresa',error);
    }
  }

  // GET Regimen fiscal
  traerRegimenFiscal = async () => {
    try {
      let _regimenFiscalSAT = await this._regimenFiscalService.traerRegimenFiscalSAT();
      this.regimenFiscal = _regimenFiscalSAT["_regimenfiscalNode"];      
      console.log('GET Regimen Fiscal', this.regimenFiscal);
    } catch (error) {
      console.log('Erro, get regimen fiscal',error);
    }
  }

}

class Empresa{
  constructor(
    public emp_nomempresa: string,
    public emp_razonsocial: string,
    public emp_direccion: string,
    public emp_numInt: string,
    public emp_numExt: string,
    public emp_colonia: string,
    public emp_rfc: string,
    public emp_localidad: string,
    public emp_municipio: string,
    public emp_estado: string,
    public emp_pais: string,
    public emp_telefono: string,
    public emp_cp: string,
    public emp_email: string,
    public emp_logo: File,
    public emp_tipo_factura: string,
    public emp_regimenfiscal_codigo: string,
    public emp_codempresa?:string){
  }
}

class Configuracion {
  constructor(
    public emp_llave:string,
    public emp_certificado:string,
    public emp_password:string,
    public emp_licencia,
    public emp_rutaxml,
    public emp_cod_confi?:string,
    public cod_empresa?:string
  ){

  }
}

class RegimenFiscal {
  constructor(
    public regimen_id: string,
    public regimen_codigo: string,
    public regimen_nombre: string,
  ){
  }
}