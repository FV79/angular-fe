import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ServiceConsultaCliente } from "../../../../../servicios/cliente/consulta-cliente.service";

@Component({
  selector: 'app-altamodificacion-cliente',
  templateUrl: './altamodificacion-cliente.component.html',
  styleUrls: ['./altamodificacion-cliente.component.css']
})
export class AltamodificacionClienteComponent implements OnInit {
  phonePattern: any = /^\+\s*52\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
  password = "";
  
  passwordOptions: any = {
      mode: "password",
      value: this.password
  };

   listaPais: string[] = [
    'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','The   Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burma','Burundi','Cambodia','Cameroon','Canada','Cape Verde','Central African Republic','Chad','Chile','China','Colombia','Comoros','Democratic Republic of the Congo','Republic of the Congo','Costa Rica','Ivory Coast','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','East Timor','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Ethiopia','Fiji','Finland','France','Gabon','The Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Republic of Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','North Korea','South Korea','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Republic of Macedonia','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Federated States of Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Namibia','Nauru','Nepal','Kingdom of the Netherlands','New Zealand','Nicaragua','Niger','Nigeria','Norway','Oman','Pakistan','Palau','State of Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','São Tomé and Príncipe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Swaziland','Sweden','Switzerland','Syria','Tajikistan','Tanzania','Thailand','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'];

  cliente = new Cliente('','','','','','','','','','','','','','','',0);


  
  constructor(private serviceConsultaCliente:ServiceConsultaCliente) {
    
   }

  ngOnInit() {
  //  console.log('aqui',this.cliente.cli_nombre);
  }

  agregarCliente( ) {
    this.serviceConsultaCliente.agregarCliente(this.cliente)
    .then((response) => {
      // limpiar();
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }


  modificarCliente () {
    this.serviceConsultaCliente.modificarCliente(this.cliente)
    .then((clienteActualizado) => {
      console.log(clienteActualizado);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  seleccionarCliente () {

    this.serviceConsultaCliente.seleccionarCliente(this.cliente.cli_rfc)
    .then((cliente:any) => {
      console.log('Para seleccionar cliente',cliente.result[0]);
    this.cliente = cliente.result[0]; 
    })
    .catch((err) => {
      console.log(err);
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


  //  this.toastLimpio();
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

