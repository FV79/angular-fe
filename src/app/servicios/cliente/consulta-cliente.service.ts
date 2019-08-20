import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceConsultaCliente {
    constructor(private httpClient:HttpClient) {

    }
    
   public getListaClientes() {
      return new Promise((resolve,reject) => {
        this.httpClient.get('http://localhost:3000/clientes',{
           responseType:'json',
           headers:{
             'token':window.localStorage.getItem('token')
           }
       })
       .subscribe((clientes => {
       resolve(clientes)
       }),(err => {
         reject(err);
       }))
      })
    }

    public agregarCliente(nuevoCliente) {
      console.log('funcion servicio');
      // console.log('SERVICIO');
      return new Promise((resolve,reject) => {
        this.httpClient.post('http://localhost:3000/clientes',{
          cliente:nuevoCliente})
        .subscribe((response => {
         resolve(response[0]);
        }),(err => {
         reject(err)
        }))
      })
    }

    public seleccionarCliente(RFC) {
      return new Promise((resolve,reject) => {
        this.httpClient.post('http://localhost:3000/cliente',{RFC})
        .subscribe((cliente => {
          resolve(cliente)
        }),(err => {
          reject(err)
        }))

      })
    }

    public modificarCliente (cliente) {
      return new Promise((resolve,reject) => {
        this.httpClient.put('http://localhost:3000/clientes',{cliente})
        .subscribe((clienteActualizado => {
          resolve(clienteActualizado);
        }),(err => {
         reject(err);
        }))
      })
      
    }

}