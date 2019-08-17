import { Component, OnInit } from '@angular/core';
import { EmpresaFacturacionServicioService } from "../../../../servicios/empresa/empresa-facturacion-servicio.service";
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  grupoRegistro: FormGroup;
  empresaRegistro = new EmpresaRegistro('','','','','');

  constructor(private empresaFacturacionServicioService:EmpresaFacturacionServicioService, public toastr: ToastrManager) { }

  ngOnInit() {
    this.grupoRegistro = new FormGroup({      
      emp_email:new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      emp_telefono:new FormControl('', [Validators.minLength(5), Validators.required]),
      emp_nomempresa:new FormControl('', [Validators.minLength(5), Validators.maxLength(60), Validators.required]),
      emp_contrasena_login:new FormControl('', [Validators.minLength(5), Validators.maxLength(30), Validators.required]),
      emp_contraseñados:new FormControl('', [Validators.minLength(5), Validators.maxLength(30), Validators.required])
    })
  }


  registro() {
  this.empresaFacturacionServicioService.registro(this.empresaRegistro)
  .then((response) => {
  console.log('Se creo la empresa',response);
  this.limpiar();
  this.toastr.successToastr('Se creado tu empresa', 'Exito!');
  })
  .catch((err) => {
    this.toastr.errorToastr('Email ya registrado', 'Error');
    console.log('Error al registrarse',err);
  })
  }


  //funcion de poner solo numeros
  solonumeros(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  limpiar() {
    this.empresaRegistro.emp_nomempresa = null;
    this.empresaRegistro.emp_telefono = null;
    this.empresaRegistro.emp_email = null;
    this.empresaRegistro.emp_contrasena_login = null;
    this.empresaRegistro.emp_contraseñados = null;
  }

}

class EmpresaRegistro {
  constructor( 
  public emp_nomempresa : string,
  public emp_telefono: string,
  public emp_email: string,
  public emp_contrasena_login: string,
  public emp_contraseñados: string) {
  }
}