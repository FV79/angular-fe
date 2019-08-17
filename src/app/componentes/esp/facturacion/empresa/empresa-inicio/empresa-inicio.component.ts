import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa-inicio',
  templateUrl: './empresa-inicio.component.html',
  styleUrls: ['./empresa-inicio.component.css']
})
export class EmpresaInicioComponent implements OnInit {
    grupoEmpresaAlta:FormGroup;
    url = '';
 listaEstado: string[] = [
    'Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Ciudad de México','Coahuila de Zaragoza','Colima','Durango','Estado de México','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacan','Morelos','Nayarit',' Nuevo León','Oaxaca','Puebla','Queretaro','San Luis Potosí','Sinaloa','Sonora','Tanasco','Tamaulipas','Tlaxcala','Veracruz','Zacatecas','Zacatecas'];
    empresa = new Empresa('','','','','','','','','','','','','','','','');

    constructor() { }

  ngOnInit() {
    this.grupoEmpresaAlta = new FormGroup({
      // cli_nombre:new FormControl('',[Validators.minLength(5),Validators.required,Validators.maxLength(50)]),
  })

  }
  

}
class Empresa{
  constructor(
    public emp_nomempresa: string,
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
    public emp_logo: string,
    public emp_tipo_factura: string,
    public emp_codempresa?:string){
  }
}