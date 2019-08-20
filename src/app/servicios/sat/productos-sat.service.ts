import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductosSatService {

  constructor(private httpClient:HttpClient) { }

  traerProductoSAT = async ()=> {
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://localhost:3000/productosat',{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(_productoSATser => {
        resolve(_productoSATser)
      },err => {
        reject(err)
      })
    })
  }
  traerProductoSATEmpresa = async ()=> {
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://localhost:3000/productosatEmpresa',{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(_productoEmpresa => {
        resolve(_productoEmpresa)
      },err => {
        reject(err)
      })
    })
  }

  insertarProductoSATEmpresa = async(producto) => {
    return new Promise((resolve,reject) => {
      this.httpClient.post('http://localhost:3000/productosatEmpresa',producto,{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(res => {
        resolve(res)
      },err => {
        reject(err)
      })
    })
  }


}
