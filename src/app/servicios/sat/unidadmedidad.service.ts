import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidadService { 

  constructor(private httpClient:HttpClient) { }


  traerMedidasSAT = async ()=> { 
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://200.92.88.27:3000/unidadmedidasat',{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(_unidadesMedidasSAT => {
        resolve(_unidadesMedidasSAT)
      },err => {
        reject(err)
      })
    })
  }
  
  traerMedidasSATEmpresa = async ()=> {
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://200.92.88.27:3000/medidasEmpresa',{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(_unidadesMedidasSAT => {
        resolve(_unidadesMedidasSAT)
      },err => {
        reject(err)
      })
    })
  }

  insertarMedidaSatEmpresa = async (medida) => {

    return new Promise((resolve,reject) => {
      this.httpClient.post('http://200.92.88.27:3000/medidasEmpresa',medida,{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(medidasEmpresa => {
        resolve(medidasEmpresa)
      },(err => {
        reject(err)
      }))
    })

  }
  
  traerMedidasSatID = async (id)=> {
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://200.92.88.27:3000/unidadmedidasat/' + id,{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(_unidadMedidasSAT => {
        resolve(_unidadMedidasSAT)
      },err => {
        reject(err)
      })
    })
  }
  traerMedidasSatCodigo = async (cod)=> {
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://200.92.88.27:3000/unidadmedidasatCod/' + cod,{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(_unidadMedidasSAT => {
        resolve(_unidadMedidasSAT)
      },err => {
        reject(err)
      })
    })
  }

}
