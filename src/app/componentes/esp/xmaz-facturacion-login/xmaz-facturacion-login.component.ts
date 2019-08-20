import { Component, OnInit } from '@angular/core';
import { EmpresaFacturacionServicioService } from "../../../servicios/empresa/empresa-facturacion-servicio.service";
import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-xmaz-facturacion-login',
  templateUrl: './xmaz-facturacion-login.component.html',
  styles: []
})
export class XmazFacturacionLoginComponent implements OnInit {
grupoLogin: FormGroup;
  empresa = new Empresa('','','','','','','','','','','','','','','','','');
  empresaLogin = new EmpresaLogin('','');
  loading: boolean;

  constructor(private empresaFacturacionServicioService:EmpresaFacturacionServicioService,
    private router:Router,
     public toastr: ToastrManager) {     
  }

  ngOnInit() {

    this.grupoLogin = new FormGroup({      
      emp_usuario_login:new FormControl('', [Validators.minLength(8), Validators.required,]),
      emp_contrasena_login:new FormControl('', [Validators.minLength(5), Validators.required]),
    })
  }
  

  login() {
    this.loading = true;
    let empresa = this.empresaLogin;
    this.empresaFacturacionServicioService.login(empresa)
    .then((empresaToken:any) => {
      this.loading = false;
    window.localStorage.setItem('token',empresaToken.token);    
    this.toastr.successToastr('Bienvenido', 'Exito');
    this.router.navigate(['/XmazAdmin'])
    })
    .catch((err) => {
      this.toastr.errorToastr('Usuario o contraseña incorrectos', 'Error');
      console.log(err);
      this.loading = false;
    })
  }

}

class Empresa {
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
    public emp_usuario_login: string,
    public emp_contrasena_login: string,
    public emp_codempresa?:string
  ){}
}
class EmpresaLogin {
  constructor(
    public emp_usuario_login: string,
    public emp_contrasena_login: string,
  ){}
}


