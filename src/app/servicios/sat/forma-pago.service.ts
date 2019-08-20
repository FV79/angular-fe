import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {

  constructor(private httpClient:HttpClient) { }

  traerFormaPagoSAT = async ()=> {
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://localhost:3000/formapagosat',{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(_formaPagoSAT => {
        resolve(_formaPagoSAT)
      },err => {
        reject(err)
      })
    })
  }

}