import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosFacturacionServicioService {

  constructor(private httpClient:HttpClient) { }

 public traerArticulos() {
    return new Promise((resolve,reject) => {
      this.httpClient.get('http://localhost:3000/articulos', {
        headers:{
          'token':window.localStorage.getItem('token')
        }
      })
      .subscribe(articulos => {
        resolve(articulos)
      },(error => {
        reject(error)
      }))
    })
  }

  public eliminarArticulo(id) {
    return new Promise((resolve,reject) => {
      this.httpClient.delete(`http://localhost:3000/articulo/${id}`,{
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

  public activarArticulo(id) {
    return new Promise((resolve,reject) => {
      this.httpClient.put(`http://localhost:3000/activarArticulo/${id}`,{token:window.localStorage.getItem('token')},{
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

  public agregarArticulo (articulo) {
    return new Promise((resolve,reject) => {
      this.httpClient.post('http://localhost:3000/articulo',articulo,{
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

  public modificarArticulo (articulo) {
    return new Promise((resolve,reject) => {
      this.httpClient.put('http://localhost:3000/articulo/'+ articulo.codArticulo,articulo,{
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

  public seleccionararticuloClave(campo_clave_producto) {
    return new Promise((resolve,reject) => {
      this.httpClient.post('http://localhost:3000/productosClave',{campo_clave_producto})
      .subscribe((producto => {
        resolve(producto)
      }),(err => {
        reject(err)
      }))

    })
  }

  


}
