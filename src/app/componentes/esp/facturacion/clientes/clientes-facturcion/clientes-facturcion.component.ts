import { Component, OnInit, enableProdMode } from '@angular/core';
import { ServiceConsultaCliente } from '../../../../../servicios/cliente/consulta-cliente.service';
import { HttpClient } from "@angular/common/http";
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormControl, FormGroup, Validators } from '@angular/forms';

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}
@Component({
  selector: 'app-clientes-facturcion',
  templateUrl: './clientes-facturcion.component.html',
  styleUrls: ['./clientes-facturcion.component.css']
})
export class ClientesFacturcionComponent implements OnInit {
  grupoCliente:FormGroup;
  saleAmountHeaderFilter: any;
  applyFilterTypes: any;
  currentFilter: any;
  showFilterRow: boolean;
  showHeaderFilter: boolean;


  phonePattern: any = /^\+\s*52\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
  password = "";
  opcion:string = 'agregar';
  passwordOptions: any = {
      mode: "password",
      value: this.password
  };

  listaEstado: string[] = [
    'Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Ciudad de México','Coahuila de Zaragoza','Colima','Durango','Estado de México','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacan','Morelos','Nayarit',' Nuevo León','Oaxaca','Puebla','Queretaro','San Luis Potosí','Sinaloa','Sonora','Tanasco','Tamaulipas','Tlaxcala','Veracruz','Zacatecas','Zacatecas'];

  cliente = new Cliente('','','','','','','','','','','','','','','',0);
  clientes = new Cliente('','','','','','','','','','','','','','','',0);
  botonHabilitado:boolean = false;

  pestanasCliente =[{
    id:1,
    nombrePestanaCliente:'Consulta Cliente'
  },
  {
    id:2,
    nombrePestanaCliente:'Alta y modificacion Cliente'
  }]

  constructor(private serviceConsultaCliente: ServiceConsultaCliente,
              public httpClient:HttpClient,
              public toastr: ToastrManager) { 
   
    
this.traerClientes();
       this.showFilterRow = true;
       this.showHeaderFilter = true;
  }

  traerClientes= async() => {
    try {
      let clientes:any = await this.serviceConsultaCliente.getListaClientes();
      this.clientes = clientes;
      console.log(this.clientes)
    } catch (error) {
      console.log(error);
    }
  }
 
  ngOnInit() {
    this.grupoCliente = new FormGroup({
        cli_nombre:new FormControl('',[Validators.minLength(5),Validators.required,Validators.maxLength(50)]),
        cli_apell_paterno:new FormControl('',[Validators.minLength(5),Validators.maxLength(30)]),
        cli_apell_materno:new FormControl('',[Validators.minLength(5),Validators.maxLength(30)]),
        cli_pais:new FormControl('',[Validators.minLength(3),Validators.maxLength(30),Validators.required]),
        cli_estado:new FormControl('',[Validators.minLength(4),Validators.maxLength(30),Validators.required]),
        cli_ciudad:new FormControl('',[Validators.minLength(4),Validators.maxLength(30),Validators.required]),
        cli_localidad:new FormControl('',[Validators.minLength(4),Validators.maxLength(30),Validators.required]),
        cli_direccion:new FormControl('',[Validators.minLength(4),Validators.maxLength(50),Validators.required]),
        cli_numInt:new FormControl('',[Validators.minLength(1),Validators.maxLength(6),Validators.required]),
        cli_numExt:new FormControl('',[Validators.minLength(1),Validators.maxLength(6)]),
        cli_cp:new FormControl('',[Validators.minLength(5),Validators.maxLength(5),Validators.required]),
        cli_colonia:new FormControl('',[Validators.minLength(3),Validators.maxLength(30),Validators.required]),
        cli_rfc:new FormControl('',[Validators.minLength(12),Validators.maxLength(13),Validators.required]),
        cli_telefono:new FormControl('',[Validators.minLength(1),Validators.maxLength(10),Validators.required]),
        cli_email:new FormControl('',[Validators.minLength(5),Validators.maxLength(35),Validators.required]),
    })
  }



  agregarCliente( ) {
    this.opcion = 'agregar';
    this.serviceConsultaCliente.agregarCliente(this.cliente)
    .then((response) => {
      this.toastr.successToastr('Se dio de alta el cliente', 'Exito!');
      this.limpiar();
      this.traerClientes();
      console.log('Dio de alta un cliente',response);
    })
    .catch((err) => {
      console.log('Error alta cliente',err);
      this.toastr.errorToastr('No se dio de alta el cliente', 'Error');
    })
  }

  modificarCliente () {
    this.opcion = 'agregar';
    this.serviceConsultaCliente.modificarCliente(this.cliente)
    .then((clienteActualizado) => {
      this.toastr.successToastr('Se actualizo el cliente', 'Exito!');
      console.log('Se actualizo cliente',clienteActualizado);
      this.limpiar();
    })
    .catch((err) => {
      console.log(err);
      this.toastr.errorToastr('No se actualizo los datos del cliente', 'Error');
    })
  }

  TraerClienteClick(index) {
    this.opcion = 'modificar';
    this.cliente.cli_nombre = this.clientes[index].cli_nombre; 
    this.cliente.cli_ciudad = this.clientes[index].cli_ciudad; 
    this.cliente.cli_codempresa = this.clientes[index].cli_codempresa; 
    this.cliente.cli_colonia = this.clientes[index].cli_colonia; 
    this.cliente.cli_cp = this.clientes[index].cli_cp; 
    this.cliente.cli_direccion = this.clientes[index].cli_direccion; 
    this.cliente.cli_email = this.clientes[index].cli_email; 
    this.cliente.cli_estado = this.clientes[index].cli_estado; 
    this.cliente.cli_rfc = this.clientes[index].cli_rfc; 
    this.cliente.cli_numExt = this.clientes[index].cli_numExt; 
    this.cliente.cli_numInt = this.clientes[index].cli_numInt; 
    this.cliente.cli_telefono = this.clientes[index].cli_telefono; 
    this.cliente.cli_pais = this.clientes[index].cli_pais; 
    this.cliente.cli_localidad = this.clientes[index].cli_localidad; 
   this.toastr.successToastr('Cliente listo para modificarrr', 'Exito!');
  }


  seleccionarCliente () {
    this.serviceConsultaCliente.seleccionarCliente(this.cliente.cli_rfc)
    .then((cliente:any) => {
      console.log(cliente.result[0]);
      this.cliente.cli_nombre = cliente.result[0].cli_nombre; 
      this.cliente.cli_ciudad = cliente.result[0].cli_ciudad; 
      this.cliente.cli_codempresa = cliente.result[0].cli_codempresa; 
      this.cliente.cli_colonia = cliente.result[0].cli_colonia; 
      this.cliente.cli_cp = cliente.result[0].cli_cp; 
      this.cliente.cli_direccion = cliente.result[0].cli_direccion; 
      this.cliente.cli_email = cliente.result[0].cli_email; 
      this.cliente.cli_estado = cliente.result[0].cli_estado; 
      this.cliente.cli_rfc = cliente.result[0].cli_rfc; 
      this.cliente.cli_numExt = cliente.result[0].cli_numExt; 
      this.cliente.cli_numInt = cliente.result[0].cli_numInt; 
      this.cliente.cli_telefono = cliente.result[0].cli_telefono; 
      this.cliente.cli_pais = cliente.result[0].cli_pais; 
      this.cliente.cli_localidad = cliente.result[0].cli_localidad; 
      this.toastr.successToastr('Cliente listo para modificar', 'Exito!');
    })
    .catch((err) => {
      console.log(err);
      this.toastr.errorToastr('No pudo encontrar cliente', 'Error');
    })
  }

 limpiar () {
   this.cliente.cli_nombre = null;
   this.cliente.cli_apell_materno = null;
   this.cliente.cli_apell_paterno = null;
   this.cliente.cli_ciudad = null;
   this.cliente.cli_codempresa = null;
   this.cliente.cli_colonia = null;
   this.cliente.cli_cp  = null;
   this.cliente.cli_direccion = null;
   this.cliente.cli_email = null;
   this.cliente.cli_estado = null;
   this.cliente.cli_rfc = null;
   this.cliente.cli_numExt = null;
   this.cliente.cli_numInt = null;
   this.cliente.cli_telefono = null;
   this.cliente.cli_pais = null;
   this.cliente.cli_localidad = null;
 }

//Solo numero
solonumeros(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  } else{
    this.toastr.errorToastr('Error','Solo se permiten numero');
  }
  return true;
}
  

}

class Cliente{
  constructor(
    public cli_nombre: string,
    public cli_apell_paterno: string,
    public cli_apell_materno: string,
    public cli_estado: string,
    public cli_localidad: string,
    public cli_ciudad: string,
    public cli_pais: string,
    public cli_direccion: string,
    public cli_numInt: string,
    public cli_numExt: string,
    public cli_colonia: string,
    public cli_cp: string,
    public cli_rfc: string,
    public cli_telefono: string,
    public cli_email: string,
    public cli_codempresa: number,
    public cli_codcliente?:string){
  }
}