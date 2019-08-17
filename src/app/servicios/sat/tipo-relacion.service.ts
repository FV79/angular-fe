import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TipoRelacionService {

  constructor(private httpClient:HttpClient) { }

  traerTipoRelacionSAT = async ()=> {
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://200.92.88.27:3000/tiporelacionsatxmaz',{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(_tipoRelacionSAT => {
        resolve(_tipoRelacionSAT)
      },err => {
        reject(err)
      })
    })
  }


}
