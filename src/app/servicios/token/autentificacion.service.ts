import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  constructor(private httpClient:HttpClient) { }

  validaToken() {
    return new Promise((resolve,reject) => {
      this.httpClient.post('http://localhost:3000/verificatoken',{
        token:window.localStorage.getItem('token')
      })
      .subscribe((response => {
    resolve(response)
      }),(err => {
        reject(err)
      }))
    })
    
  }

}
