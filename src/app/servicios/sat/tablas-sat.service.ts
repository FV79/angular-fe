import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TablasSatService {

  constructor(private httpClient:HttpClient) {

   }



   public getListaUnidadMedida() {
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://localhost:3000/unidadmedida',{
         responseType:'json',
         headers:{
           'token':window.localStorage.getItem('token')
         }
     })
     .subscribe((unidadmedida => {
     resolve(unidadmedida)
     }),(err => {
       reject(err);
     }))
    })
  }


}
