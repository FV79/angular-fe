import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsoCfdiService {

  constructor(private httpClient:HttpClient) { }

  traerUcfiSAT = async ()=> {
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://200.92.88.27:3000/usocfdisat',{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(_usocfdiSAT => {
        resolve(_usocfdiSAT)
      },err => {
        reject(err)
      })
    })
  }

}
