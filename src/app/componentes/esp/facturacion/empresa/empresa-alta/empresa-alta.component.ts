import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpresaFacturacionServicioService } from "../../../../../servicios/empresa/empresa-facturacion-servicio.service";
import { RegimenFiscalService } from '../../../../../servicios/sat/regimen-fiscal.service';


@Component({
  selector: 'app-empresa-alta',
  templateUrl: './empresa-alta.component.html',
  styleUrls: ['./empresa-alta.component.css']
})
export class EmpresaAltaComponent implements OnInit {
  empresa = new Empresa('','','','','','','','','','','','','','',null,'','');
  configuracion = new Configuracion(null,null,'','','','','')
  grupoEmpresaAlta:FormGroup;
  paso1: string = 'Datos de la empresa';
  paso2: string = 'Archivos de facturación';
  listaEstado: string[] = [
    'Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Ciudad de México','Coahuila de Zaragoza','Colima','Durango','Estado de México','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacan','Morelos','Nayarit',' Nuevo León','Oaxaca','Puebla','Queretaro','San Luis Potosí','Sinaloa','Sonora','Tanasco','Tamaulipas','Tlaxcala','Veracruz','Zacatecas','Zacatecas'];
  
    loading: boolean;
    //regimen fiscal
    regimenFiscal = new RegimenFiscal('','','');


  constructor(private empresaFacturacionServicioService:EmpresaFacturacionServicioService,
     public toastr: ToastrManager,
     private _regimenFiscalService:RegimenFiscalService) {
    this.loading = true;
    this.empresaFacturacionServicioService.getEmpresaLogin()
    .then((empresa) => {
      
      this.empresa = empresa["empresa"]
      this.configuracion = empresa["configuracion"]
  console.log(this.configuracion,'Ver configuracion');
    })
    .catch((error) => {
      console.log('Error en empresa configuracion',error);
    })
    
    this.traerRegimenFiscal();
   }

  ngOnInit() {
    this.grupoEmpresaAlta = new FormGroup({
      // cli_nombre:new FormControl('',[Validators.minLength(5),Validators.required,Validators.maxLength(50)]),
  })
  }
  buscarEmpresaPorId = async(id) => {
    try { 
    let empresa = await this.empresaFacturacionServicioService.findEmpresaById(id)
    this.empresa = empresa["empresa"][0]
   
    } catch (error) {
       console.log('Buscar empresa por ID',error);
    }
   }
   
   onFileChange() {
    let imagen:any = document.getElementById("imagePreview")
    let archivos:any = document.getElementById("file")
    let reader = new FileReader();

    reader.onloadend=()=> {
      imagen.src = reader.result
       this.empresa.emp_logo = archivos.files[0]
      console.log('Cargar la imagen',archivos.files[0]);
    }
   reader.readAsDataURL(archivos.files[0]);
 
 
   }

   onLlaveChange() {
    
    let archivos:any = document.getElementById("llave")
    let reader = new FileReader();

    reader.onloadend=()=> {
       this.configuracion.emp_llave = archivos.files[0]
      console.log('Cargar la llave',archivos.files[0]);
    }
   reader.readAsDataURL(archivos.files[0]);

   }

   onCertificadoChange() {
    let archivos:any = document.getElementById("certificado")
    let reader = new FileReader();

    reader.onloadend=()=> {
       this.configuracion.emp_certificado = archivos.files[0]
      console.log('Cargar Certificado',archivos.files[0]);
    }
   reader.readAsDataURL(archivos.files[0]);
   }

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
      console.log('Empresa Actualizar',empAct);
      this.empresa = empAct["empresa"];
      this.configuracion = empAct["configuracion"];
      window.localStorage.setItem('token',empAct["token"])
      this.toastr.successToastr('Se actualizo correctamente los datos de la empresa', 'Exito!');
    } catch (error) {
      console.log('Error al actualizar',error);
    }
  }

  // GET Regimen fiscal
  traerRegimenFiscal = async () => {
    try {
      let _regimenFiscalSAT = await this._regimenFiscalService.traerRegimenFiscalSAT();
      this.regimenFiscal = _regimenFiscalSAT["_regimenfiscalNode"];      
      this.loading = false;
      console.log('Get Regimen Fiscal', this.regimenFiscal);
    } catch (error) {
      console.log('Error en Regimen Fiscal',error);
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