import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class FacturacionFacturacionServicioService {

  constructor(private httpClient:HttpClient) { }

public hacerFactura = async(factura) => {
    return new Promise((resolve,reject) => {
      this.httpClient.post('http://localhost:3000/factura',factura,{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(res => {
        
       resolve(res)
      },(err => {
        reject(err)
      }))
    })
  } 

  public funcionPDF = async(opcion,folio,ext)=> {  
    return new Promise((resolve,reject) => {
      this.httpClient.post('http://localhost:3000/facturaPDF',{opcion,folio,ext}, {
        headers:{
          'token':window.localStorage.getItem('token')
        },
        responseType:'blob' 
      })
      .subscribe(res => {
        // saveAs(res,nombrePDF)
          // let blob = new Blob([res],{type:"application/pdf"})
          // let url = window.URL.createObjectURL(blob);
        // let pwa = window.open(url);
        resolve(res);
      },(err => {
        reject(err);
      }))
    })
  }

  public funcionPDFEnviar = async(opcion,folio,correos)=> { 
    return new Promise((resolve,reject) => {
      this.httpClient.post('http://localhost:3000/facturaPDF',{opcion,folio,correos}, {
        headers:{
          'token':window.localStorage.getItem('token')
        },
      })
      .subscribe(res => {
        resolve(res);
      },(err => {
        reject(err);
      }))
    })
  }

  public traerFacturas = async ()=> {
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://localhost:3000/facturaBuscar',{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(_facturaFE => {
        resolve(_facturaFE)
      },err => {
        reject(err)
      })
    })
  }

  

}


