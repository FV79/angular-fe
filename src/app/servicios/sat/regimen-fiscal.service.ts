import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegimenFiscalService {

  constructor(private httpClient:HttpClient) { }

  traerRegimenFiscalSAT = async ()=> {
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://localhost:3000/regimenfiscalsat',{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(_regigemnFiscalSAT => {
        resolve(_regigemnFiscalSAT)
      },err => {
        reject(err)
      })
    })
  }

}
