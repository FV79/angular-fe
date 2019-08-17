import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {AutentificacionService} from '../token/autentificacion.service'

@Injectable({
  providedIn: 'root'
})
export class EmpresaFacturacionServicioService {

  empresa:any

  constructor(private httpClient:HttpClient,private autentificacionService:AutentificacionService) {
    
   }

  public login(empresa) {
    return new Promise((resolve,reject) => {
      this.httpClient.post('http://200.92.88.27:3000/login',empresa)
      .subscribe((empresaToken => {
        this.empresa = empresaToken["empresa"]
      resolve(empresaToken)
      }),(err => {
        reject(err)
      }))
    })
 
  }
  

  public findEmpresaById(id) {
    return new Promise((resolve,reject) => {
      this.httpClient.get(`http://200.92.88.27:3000/traerEmpresa/${id}`,{
        headers:{
          'token': window.localStorage.getItem('token')
        }
      })
      .subscribe((empresa => {
        resolve(empresa)
      }),(err => {
        reject(err)
      }))
  
    })
  }

  public getEmpresaLogin () {
    
    return new Promise((resolve,reject) => {
       this.autentificacionService.validaToken()
       .then((empresa) => {
          resolve(empresa)
       })
       .catch((error) => {
         reject(error)
       })
      
    })
  }

  public registro(empresa) {
  return new Promise((resolve,reject) => {
    this.httpClient.post('http://200.92.88.27:3000/registrar',{empresa})
    .subscribe(res => {
      resolve(res);
    },(err => {
      reject(err)
    }))
  })
  }

  public actualizar(empresa) {
    return new Promise((resolve,reject) => {
      this.httpClient.put('http://200.92.88.27:3000/empresa',empresa,{
        headers:{
          'token':window.localStorage.getItem('token'),
          // 'Content-Type': 'multipart/form-data'
        }
      })
      .subscribe(res => {
        resolve(res);
      },(err => {
        reject(err)
      }))
    })
  }

}
