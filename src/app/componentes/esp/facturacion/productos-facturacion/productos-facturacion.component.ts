import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TablasSatService } from '../../../../servicios/sat/tablas-sat.service';
import { ProductosFacturacionServicioService } from "../../../../servicios/productos/productos-facturacion-servicio.service";
import { EmpresaFacturacionServicioService } from "../../../../servicios/empresa/empresa-facturacion-servicio.service";
import { UnidadmedidadService } from "../../../../servicios/sat/unidadmedidad.service";
import { ProductosSatService } from '../../../../servicios/sat/productos-sat.service';


@Component({
  selector: 'app-productos-facturacion',
  templateUrl: './productos-facturacion.component.html',
  styleUrls: ['./productos-facturacion.component.css']
})
export class ProductosFacturacionComponent implements OnInit {
  saleAmountHeaderFilter: any;
  applyFilterTypes: any;
  currentFilter: any;
  showFilterRow: boolean;
  showHeaderFilter: boolean;
  groupProductos: FormGroup;
  articulos:any
  articulo = new Producto('',0,0,0,0,'','','','',null,'');
  
  producto:any = new Producto('',0,0,0,0,'','','','',null,'');
  productoMostrar = new Producto('',0,0,0,0,'','','','',null,'');
  prouctosEncontrados = [];
  filtroArticulo:string = '';
  paginaActualArticulo = 1;
  numPaginasArticulos:any = [];


pro_ISH:boolean;
imp_IVA:boolean;

producto2 = new Producto2('','','',0,0,0,'',0,0,0,0,null,'')
productoModificar = new Producto2('','','',0,0,0,'',0,0,0,0,null,'');
_unidadMedida:any = new unidadMedida('','','');
_unidadMedidaEmpresa:any = new catUnidadMedidaSATEmpresa("","","","");
_unidadMedidaEmpresaMostrar = new catUnidadMedidaSATEmpresa("","","","");
_UMSE_encontradas = [];

_unidadMedidaMostrar = new unidadMedida('','','');
_UMS_encontradas = [];
productosSATempresa:any = new claveProductoSatEmpresa("","","","")
productosSATempresaMostrar = new claveProductoSatEmpresa("","","","")
_claveProductoSat:any = new claveProductoSat('','','');
_claveProductoSatMostrar = new claveProductoSat('','','');
PS_encontrados = [];
PS_encontradosEmpresa = [];
numPalabras=1;

paginaActual:any = 1;
numPaginas:any  = [];
filtroUMS:string = '';

paginaActualProducto:any = 1;
numPaginasProducto:any  = [];
filtroProducto:string = '';

paginaActualProductoEmpresa:any = 1;
numPaginasProductoEmpresa:any  = [];
filtroProductoEmpresa:string = '';


paginaActualEmpresa:any = 1;
numPaginasEmpresa:any  = [];
filtroUMSEmpresa:string = '';

//Tazas de IVA
tazaIVA = [{
  valor: 0.8,
  descripcion: "8%"
},{
  valor: 0.16,
  descripcion: "16%"
}];

//catalogos de producto
catProductoSAT = new catProductoSAT('','','');
//catalogos de Unidad medida
catUnidadMedidaSAT = new catUnidadMedidaSAT('','','');

//Pestañas
  pestanasProducto =[
  {
    id:1,
    nombrePestanaProducto:'aqui'
  },
  {
    id:2,
    nombrePestanaProducto:'Productos'
  },
  {
    id:3,
    nombrePestanaProducto:'Agregar Producto'
  },
  {
    id:4,
    nombrePestanaProducto:'Unidades de medida SAT'
  },
  {
    id:5,
    nombrePestanaProducto:'Productos SAT'
  }]



  constructor(public toastr: ToastrManager,
              private empresaFacturacionServicioService:EmpresaFacturacionServicioService,
              private productosFacturacionServicioService:ProductosFacturacionServicioService,
              private _tablasSatService:TablasSatService,
              private _unidadmedidadService:UnidadmedidadService,
              private _productosSatService:ProductosSatService
    ) {

    this.traerArticulos();  
    this.traerUnidadesMedidaSAT();
    this.traerProductoSAT();
    this.traerProductosSATEmpresa();
    this.traerUnidadesMedidaSATEmpresa();
   }

   ReiniciarNumPalabras = () => {
     this.numPalabras = 1;
   }

   //Filtro de lista de productos
   FiltroArticulos = (filtro) => {
     console.log('Filtro de producto por nombre');
    this.paginaActualArticulo = 1;
    this.paginadoArticulos(3);
      if(filtro == '' ){
        this.paginaActualArticulo = 1;
        this.paginadoArticulos(1);
      }else{
        this.prouctosEncontrados = []; 
        let palabras = filtro.split(",");
        if(palabras.length - this.numPalabras == 1) {
          this.paginaActualArticulo = 1;
          this.paginadoArticulos(1);
        }else {
          for(let x = 0;x <= palabras.length-1;x++) {
            if(palabras[x] != "") {
              let U_Encontradas = this.producto.filter((producto) => {
                let contador = 0;

                for(let y = 0; y<palabras[x].length;y++) {
                  for(let j = 0; j< producto.pro_nombre.length;j++) {
                    if(palabras[x][y] == producto.pro_nombre[j]) {
                      contador++;
                      y++;
                      if(contador == palabras[x].length) {
                        break;
                      }
                    }else {
                      if(contador > 0) {
                        contador--;
                        y--;  
                      }else {
                        continue;
                      }
                    }
                  }
                }
                // for(let y = 0; y <= producto.pro_nombre.length-1; y++){
                //    if(palabras[x][y] != producto.pro_nombre[y]) {
                //     break;
                //    }else {
                //      contador++;

                //    }
                // }
                if(contador == palabras[x].length) {
                  return producto;
                }
                
                if(palabras[x] == producto.codArticulo) {
                  return producto;
                }
                contador = 0;
                // return medida.id_unidad == palabras[x] || medida.codigo == palabras[x] || medida.nombre == palabras[x]
              });
              for (const unidad of U_Encontradas) {
                if(this.prouctosEncontrados.indexOf(unidad) == -1){
                  this.prouctosEncontrados.push(unidad)
                }
              }
              this.paginadoArticulos(2,this.prouctosEncontrados); 
            }else{
              if(palabras.length == this.numPalabras || palabras.length - this.numPalabras != 1) {
                this.paginaActualArticulo = 1;
                this.paginadoArticulos(1);
                break;
              }
            }
          } 
                    
        }
        this.numPalabras = palabras.length;  
      }
   }

   //Paginado de lista de productos
   paginadoArticulos = async (tipo,productos?) => {
    if(tipo == 1) {
      this.numPaginasArticulos = [];
      let np = Math.floor(this.producto["length"]/50);
      for(let x = 0; x <=np; x++) {
        this.numPaginasArticulos.push(x);
      }
      let inicio = (this.paginaActualArticulo-1)*50;
      let final = inicio + 50;
  
      this.productoMostrar = this.producto.slice(inicio,final);
    }else if(tipo == 2){
      this.numPaginasArticulos = [];
      let np = Math.floor(productos["length"]/50);
      for(let x = 0; x <=np; x++) {
        this.numPaginasArticulos.push(x);
      }
      let inicio = (this.paginaActualArticulo-1)*50;
      let final = inicio + 50;
  
      this.productoMostrar = productos.slice(inicio,final);
    }else {
      if(this.filtroArticulo == ''){
        this.paginadoArticulos(1)
      }else {
        this.paginadoArticulos(2,this.prouctosEncontrados)
      }
    }
    
  }

  //Cambio de pagina de lista de productos
  cambiarPaginaArticulos =async(pag) => {
    this.paginaActualArticulo = pag;
    this.paginadoArticulos(3);
  }


    //Filtro para SAT interno
   FiltroPSATEmpresa = (filtro) => {
   console.log('FILTRO Producto filtrado del SAT');
    this.paginaActualProductoEmpresa = 1;
    this.paginadoPSATEmpresa(3);
      if(filtro == '' ){
        this.paginaActualProductoEmpresa = 1;
        this.paginadoPSATEmpresa(1);
      }else{
        this.PS_encontradosEmpresa = []; 
        let palabras = filtro.split(",");
        if(palabras.length - this.numPalabras == 1) {
          this.paginaActualProductoEmpresa = 1;
          this.paginadoPSATEmpresa(1);
        }else {
          for(let x = 0;x <= palabras.length-1;x++) {
            if(palabras[x] != "") {
              let U_Encontradas = this.productosSATempresa.filter((producto) => {
                let contador = 0;
                
                for(let y = 0; y<palabras[x].length;y++) {
                  for(let j = 0; j< producto.nombre.length;j++) {
                    if(palabras[x][y] == producto.nombre[j]) {
                      contador++;
                      y++;
                      if(contador == palabras[x].length) {
                        break;
                      }
                    }else {
                      if(contador > 0) {
                        contador--;
                        y--;  
                      }else {
                        continue;
                      }
                    }
                  }
                }
                
                if(contador == palabras[x].length) {
                  return producto;
                }
                
                if(palabras[x] == producto.id_producto_sat || palabras[x] == producto.codigo) {
                  return producto;
                }
                contador = 0;
                // return medida.id_unidad == palabras[x] || medida.codigo == palabras[x] || medida.nombre == palabras[x]
              });
              for (const unidad of U_Encontradas) {
                if(this.PS_encontradosEmpresa.indexOf(unidad) == -1){
                  this.PS_encontradosEmpresa.push(unidad)
                }
              }
              this.paginadoPSATEmpresa(2,this.PS_encontradosEmpresa); 
            }else{
              if(palabras.length == this.numPalabras || palabras.length - this.numPalabras != 1) {
                this.paginaActualProductoEmpresa = 1;
                this.paginadoPSATEmpresa(1);
                break;
              }
            }
          } 
                    
        }
        this.numPalabras = palabras.length;  
      }
   }

   paginadoPSATEmpresa = async (tipo,productos?) => {
    if(tipo == 1) {
      this.numPaginasProductoEmpresa = [];
      let np = Math.floor(this.productosSATempresa["length"]/50);
      for(let x = 0; x <=np; x++) {
        this.numPaginasProductoEmpresa.push(x);
      }
      let inicio = (this.paginaActualProductoEmpresa-1)*50;
      let final = inicio + 50;
  
      this.productosSATempresaMostrar = this.productosSATempresa.slice(inicio,final);
    }else if(tipo == 2){
      this.numPaginasProductoEmpresa = [];
      let np = Math.floor(productos["length"]/50);
      for(let x = 0; x <=np; x++) {
        this.numPaginasProductoEmpresa.push(x);
      }
      let inicio = (this.paginaActualProductoEmpresa-1)*50;
      let final = inicio + 50;
  
      this.productosSATempresaMostrar = productos.slice(inicio,final);
    }else {
      if(this.filtroProductoEmpresa == ''){
        this.paginadoPSATEmpresa(1)
      }else {
        this.paginadoPSATEmpresa(2,this.PS_encontradosEmpresa)
      }
    }
    
  }

  cambiarPaginaPSATEmpresa =async(pag) => {
    this.paginaActualProductoEmpresa = pag;
    this.paginadoPSATEmpresa(3);
  }

  //Filtro para UDM
   FiltroPSAT = (filtro) => {
     console.log('Filtro para UDM');
    this.paginaActualProducto = 1;
    this.paginadoPSAT(3);
      if(filtro == '' ){
        this.paginaActualProducto = 1;
        this.paginadoPSAT(1);
      }else{
        this.PS_encontrados = []; 
        let palabras = filtro.split(",");
        if(palabras.length - this.numPalabras == 1) {
          this.paginaActualProducto = 1;
          this.paginadoPSAT(1);
        }else {
          for(let x = 0;x <= palabras.length-1;x++) {
            if(palabras[x] != "") {
              let U_Encontradas = this._claveProductoSat.filter((producto) => {
                let contador = 0;

                for(let y = 0; y<palabras[x].length;y++) {
                  for(let j = 0; j< producto.nombre.length;j++) {
                    if(palabras[x][y] == producto.nombre[j]) {
                      contador++;
                      y++;
                      if(contador == palabras[x].length) {
                        break;
                      }
                    }else {
                      if(contador > 0) {
                        contador--;
                        y--;  
                      }else {
                        continue;
                      }
                    }
                  }
                }
                
                if(contador == palabras[x].length) {
                  return producto;
                }
                
                if(palabras[x] == producto.id_producto || palabras[x] == producto.codigo) {
                  return producto;
                }
                contador = 0;
                // return medida.id_unidad == palabras[x] || medida.codigo == palabras[x] || medida.nombre == palabras[x]
              });
              for (const unidad of U_Encontradas) {
                if(this.PS_encontrados.indexOf(unidad) == -1){
                  this.PS_encontrados.push(unidad)
                }
              }
              this.paginadoPSAT(2,this.PS_encontrados); 
            }else{
              if(palabras.length == this.numPalabras || palabras.length - this.numPalabras != 1) {
                this.paginaActualProducto = 1;
                this.paginadoPSAT(1);
                break;
              }
            }
          } 
                    
        }
        this.numPalabras = palabras.length;  
      }
   }

   paginadoPSAT = async (tipo,productos?) => {
    if(tipo == 1) {
      
      this.numPaginasProducto = [];
      let np = Math.floor(this._claveProductoSat["length"]/50);
      for(let x = 0; x <=np; x++) {
        this.numPaginasProducto.push(x);
      }
      let inicio = (this.paginaActualProducto-1)*50;
      let final = inicio + 50;
  
      this._claveProductoSatMostrar = this._claveProductoSat.slice(inicio,final);
    }else if(tipo == 2){
     
      this.numPaginasProducto = [];
      let np = Math.floor(productos["length"]/50);
      for(let x = 0; x <=np; x++) {
        this.numPaginasProducto.push(x);
      }
      let inicio = (this.paginaActualProducto-1)*50;
      let final = inicio + 50;
  
      this._claveProductoSatMostrar = productos.slice(inicio,final);
    }else {
      if(this.filtroProducto == ''){
        this.paginadoPSAT(1)
      }else {
        this.paginadoPSAT(2,this.PS_encontrados)
      }
    }
    
  }

  cambiarPaginaPSAT =async(pag) => {
    this.paginaActualProducto = pag;
    this.paginadoPSAT(3);
  }


  //Filtro para agregar producto UDM
   FiltroUMSEmpresa = (filtro) => {
     console.log('FILTRO UDM');
    this.paginaActualEmpresa = 1;
    this.paginadoUMSEmpresa(3);
      if(filtro == '' ){
        this.paginaActualEmpresa = 1;
        this.paginadoUMSEmpresa(1);
      }else{
        this._UMSE_encontradas = []; 
        let palabras = filtro.split(",");
        if(palabras.length - this.numPalabras == 1) {
          this.paginaActualEmpresa = 1;
          this.paginadoUMSEmpresa(1);
        }else {
          for(let x = 0;x <= palabras.length-1;x++) {
            if(palabras[x] != "") {
              let U_Encontradas = this._unidadMedidaEmpresa.filter((medida) => {
                let contador = 0;

                for(let y = 0; y<palabras[x].length;y++) {
                  for(let j = 0; j< medida.nombre.length;j++) {
                    if(palabras[x][y] == medida.nombre[j]) {
                      contador++;
                      y++;
                      if(contador == palabras[x].length) {
                        break;
                      }
                    }else {
                      if(contador > 0) {
                        contador--;
                        y--;  
                      }else {
                        continue;
                      }
                    }
                  }
                }

                // for(let y = 0; y <= medida.nombre.length-1; y++){
                //    if(palabras[x][y] != medida.nombre[y]) {
                //     break;
                //    }else {
                //      contador++; 
                //    }
                // }

                if(contador == palabras[x].length) {
                  return medida;
                }
                
                if(palabras[x] == medida.id_unidad_sat || palabras[x] == medida.codigo) {
                  return medida;
                }
                contador = 0;
                // return medida.id_unidad == palabras[x] || medida.codigo == palabras[x] || medida.nombre == palabras[x]
              });
              for (const unidad of U_Encontradas) {
                if(this._UMSE_encontradas.indexOf(unidad) == -1){
                  this._UMSE_encontradas.push(unidad)
                }
              }
              this.paginadoUMSEmpresa(2,this._UMSE_encontradas); 
            }else{
              if(palabras.length == this.numPalabras || palabras.length - this.numPalabras != 1) {
                this.paginaActualEmpresa = 1;
                this.paginadoUMSEmpresa(1);
                break;
              }
            }
          } 
                    
        }
        this.numPalabras = palabras.length;  
      }
   }

   paginadoUMSEmpresa = async (tipo,unidades?) => {
    if(tipo == 1) {
      this.numPaginasEmpresa = [];
      let np = Math.floor(this._unidadMedidaEmpresa["length"]/50);
      for(let x = 0; x <=np; x++) {
        this.numPaginasEmpresa.push(x);
      }
      let inicio = (this.paginaActualEmpresa-1)*50;
      let final = inicio + 50;
  
      this._unidadMedidaEmpresaMostrar = this._unidadMedidaEmpresa.slice(inicio,final);
    }else if(tipo == 2){
      this.numPaginasEmpresa = [];
      let np = Math.floor(unidades["length"]/50);
      for(let x = 0; x <=np; x++) {
        this.numPaginasEmpresa.push(x);
      }
      let inicio = (this.paginaActualEmpresa-1)*50;
      let final = inicio + 50;
  
      this._unidadMedidaEmpresaMostrar = unidades.slice(inicio,final);
    }else {
      if(this.filtroUMSEmpresa == ''){
        this.paginadoUMSEmpresa(1)
      }else {
        this.paginadoUMSEmpresa(2,this._UMSE_encontradas)
      }
    }
    
  }
  
  cambiarPaginaUMSE =async(pag) => {
    this.paginaActualEmpresa = pag;
    this.paginadoUMSEmpresa(3);
  }

  //Filtro para las UDM Del catalogo del SAT
   FiltroUMS = (filtro) => {
     console.log('Medidas Catalogo SAT');
    this.paginaActual = 1;
    this.paginadoUMS(3);
      if(filtro == '' ){
        this.paginaActual = 1;
        this.paginadoUMS(1);
      }else{
        this._UMS_encontradas = []; 
        let palabras = filtro.split(",");
        if(palabras.length - this.numPalabras == 1) {
          this.paginaActual = 1;
          this.paginadoUMS(1);
        }else {
          for(let x = 0;x <= palabras.length-1;x++) {
            if(palabras[x] != "") {
              let U_Encontradas = this._unidadMedida.filter((medida) => {
                let contador = 0;

                for(let y = 0; y<palabras[x].length;y++) {
                  for(let j = 0; j< medida.nombre.length;j++) {
                    if(palabras[x][y] == medida.nombre[j]) {
                      contador++;
                      y++;
                      if(contador == palabras[x].length) {
                        break;
                      }
                    }else {
                      if(contador > 0) {
                        contador--;
                        y--;  
                      }else {
                        continue;
                      }
                    }
                  }
                }

                // for(let y = 0; y <= medida.nombre.length-1; y++){
                //    if(palabras[x][y] != medida.nombre[y]) {
                //     break;
                //    }else {
                //      contador++; 
                //    }
                // }
                if(contador == palabras[x].length) {
                  return medida;
                }
                
                if(palabras[x] == medida.id_unidad || palabras[x] == medida.codigo) {
                  return medida;
                }
                contador = 0;
                // return medida.id_unidad == palabras[x] || medida.codigo == palabras[x] || medida.nombre == palabras[x]
              });
              for (const unidad of U_Encontradas) {
                if(this._UMS_encontradas.indexOf(unidad) == -1){
                  this._UMS_encontradas.push(unidad)
                }
              }
              this.paginadoUMS(2,this._UMS_encontradas); 
            }else{
              if(palabras.length == this.numPalabras || palabras.length - this.numPalabras != 1) {
                this.paginaActual = 1;
                this.paginadoUMS(1);
                break;
              }
            }
          } 
                    
        }
        this.numPalabras = palabras.length;  
      }
   }

  cambiarPaginaUMS =async(pag) => {
    this.paginaActual = pag;
    this.paginadoUMS(3);
  }

  paginadoUMS = async (tipo,unidades?) => {
    if(tipo == 1) {
      this.numPaginas = [];
      let np = Math.floor(this._unidadMedida["length"]/50);
      for(let x = 0; x <=np; x++) {
        this.numPaginas.push(x);
      }
      let inicio = (this.paginaActual-1)*50;
      let final = inicio + 50;
  
      this._unidadMedidaMostrar = this._unidadMedida.slice(inicio,final);
    }else if(tipo == 2){
      this.numPaginas = [];
      let np = Math.floor(unidades["length"]/50);
      for(let x = 0; x <=np; x++) {
        this.numPaginas.push(x);
      }
      let inicio = (this.paginaActual-1)*50;
      let final = inicio + 50;
  
      this._unidadMedidaMostrar = unidades.slice(inicio,final);
    }else {
      if(this.filtroUMS == ''){
        this.paginadoUMS(1)
      }else {
        this.paginadoUMS(2,this._UMS_encontradas)
      }
    }
    
  }

  eliminar = async (id) => {
    try {
      await this.productosFacturacionServicioService.eliminarArticulo(id)
      this.traerArticulos();
     } catch (error) {
       console.log('Error al eliminar',error)
     }
   }

   reactivar = async (id) => {
    try {
      await this.productosFacturacionServicioService.activarArticulo(id)
      this.traerArticulos();
     } catch (error) {
       console.log('Error al reactivar',error)
     }

   }

  //Traer medidas de unidad SAT
   traerMedida(id) {     
    this.catUnidadMedidaSAT.nombre = this._unidadMedida[id].nombre;
    this.catUnidadMedidaSAT.codigo = this._unidadMedida[id].codigo;
    this.catUnidadMedidaSAT.id_unidad_sat = this._unidadMedida[id].id_unidad;
   }

   traerMedidaEmpresa(id) {
    this.producto2.pro_nombre_medida = this._unidadMedidaEmpresa[id].nombre;
    this.producto2.pro_unidad_medida = this._unidadMedidaEmpresa[id].codigo;
   }


   modificarProducto = async() => {
     try {
       !this.pro_ISH ?this.productoModificar.pro_ISH = 0:null;
       !this.productoModificar.pro_ISR ?this.productoModificar.pro_ISR = 0:null;
       !this.productoModificar.pro_IVA ?this.productoModificar.pro_IVA = 0:null;
       await this.productosFacturacionServicioService.modificarArticulo(this.productoModificar)
       this.traerArticulos();
       this.toastr.successToastr('Exito','Se agrego modificar producto');
     } catch (error) {
       console.log('Error no se modifica producto interno',error)
       this.toastr.errorToastr('Error','No se logro modificar producto');
     }
   }

   traerProducto(id) {
     this.catProductoSAT = this._claveProductoSat[id];
   }

   traerProductoEmpresa(index) {
     this.producto2.pro_clave = this.productosSATempresa[index].codigo
   }

   //GET producto filtrado
   traerProductosSATEmpresa = async() =>{
    try {
      let productosSatEmpresa = await this._productosSatService.traerProductoSATEmpresa();
      this.productosSATempresa = productosSatEmpresa["productosEmpresa"];   
      this.paginadoPSATEmpresa(1); 
    } catch (error) {
      console.log('Error Get porducto SAT filtrado',error);
    }
   }

   //Agregar producto SAT
   insertarProductoSATEmpresa=async() => {
     try {
       await this._productosSatService.insertarProductoSATEmpresa(this.catProductoSAT)
       this.traerProductosSATEmpresa();
       this.toastr.successToastr('Se ha agregado un Producto SAT','Exito');
       this.limpiarProductos();
     } catch (error) {
       console.log('Error no se agrego producto SAT',error);
       this.toastr.errorToastr('Error','No se agrego producto SAT');
     }
   }

   //Agregar prodcuto de la empresa
  agregarProducto = async() => { 
    try {
      await this.productosFacturacionServicioService.agregarArticulo(this.producto2)
      this.traerArticulos();
      this.toastr.successToastr('Exito','Se ha guardado un producto nuevo dentro de tu empresa');
    } catch (error) {
      console.log('Error agregar producto',error);
      this.toastr.errorToastr('Error','No se logro ingresar un producto nuevo');
    }
  }

   //Agregar producto (?)
   agregar = async () => {
    try {
      await this.productosFacturacionServicioService.agregarArticulo(this.articulo)
      this.traerArticulos();
    } catch (error) {
      console.log('Error agregar productos',error);
    }
   }

   // GET unidades filtradas
   traerUnidadesMedidaSAT = async () => {
     try {
       let _unidadesMedidaSat = await this._unidadmedidadService.traerMedidasSAT();
       
       this._unidadMedida = _unidadesMedidaSat["_unidadesMedidaSAT"];      
       this.paginadoUMS(1);
     } catch (error) {
       console.log('Error Get unidad de productos filtradas',error);
     }
   }

   // Get unidades SAT
   traerUnidadesMedidaSATEmpresa = async () => {
    try {
      let _unidadesMedidaSat = await this._unidadmedidadService.traerMedidasSATEmpresa(); 
      this._unidadMedidaEmpresa = _unidadesMedidaSat["medidasEmpresa"];      
      this.paginadoUMSEmpresa(1);
    } catch (error) {
      console.log('Error Get Unidad Medida SAT',error);
    }
  }

  //Get insertar medida medida SAT
  insertarMedidaSatEmpresa = async () => {
    try {
    await this._unidadmedidadService.insertarMedidaSatEmpresa(this.catUnidadMedidaSAT);
    this.traerUnidadesMedidaSATEmpresa();
    this.paginadoUMSEmpresa(1);
      this.toastr.successToastr('Se ha creado una Unidad de Medida SAT','Exito');
      this.limpiarUnidades();
    } catch (error) {
      console.log('Error no se creo unidad medida SAT',error);
      this.toastr.errorToastr('Error','No se logro agregar una unidad de medida SAT');
    }
  }

  //Get producto SAT
   traerProductoSAT = async () => {
    try {
      let _productoSAT = await this._productosSatService.traerProductoSAT();
      this._claveProductoSat = _productoSAT["_productoSAT"];
      this.paginadoPSAT(1);
    } catch (error) {
      console.log('erro get productos SAT',error);
    }
  }

  //Get Articulos productos
  traerArticulos = async () => {
    try {
      let producto = await this.productosFacturacionServicioService.traerArticulos();
      this.producto = producto["articulos"];
      this.paginadoArticulos(1);
    } catch (error) {
      console.log('Error get productos internos',error);
    }
   }

  //funcion de limpiar todo en agregar producto
  limpiar() {
        this.producto2.pro_clave = null;
        this.producto2.pro_clave_sat = null;
        this.producto2.pro_nombre = null;
        this.producto2.pro_costo = null;
        this.producto2.pro_precio = null;
        this.producto2.pro_descuento = null;
        this.producto2.pro_IVA = null;
        this.producto2.pro_ISR = null;
        this.producto2.pro_ISH = null;
        this.producto2.pro_IEPS = null;
        this.producto2.pro_unidad_medida = null;
  }

  // limpiar Unidades SAT
  limpiarUnidades() {
  this.catUnidadMedidaSAT.codigo = null;
  this.catUnidadMedidaSAT.nombre = null;
 }

  // limpiar Productos SAT
  limpiarProductos() {
    this.catProductoSAT.codigo = null;
    this.catProductoSAT.nombre = null;
  }

 ngOnInit() {
   console.log('Se entro a productos');
}

}

class Producto {
  constructor(
    public pro_nombre: string,
    public pro_precio: number,
    public pro_costo: number,
    public pro_descuento: number,
    public pro_iva: number,
    public pro_medida: string,
    public pro_cod_cliente: string,
    public pro_clave: string,
    public pro_emp_cod:string,
    public pro_status:boolean,
    public codArticulo?:string
  ){
  }
}

class Producto2 {
  constructor(
    public pro_clave: string,
    public pro_clave_sat: string,
    public pro_nombre: string,
    public pro_costo: number,
    public pro_precio: number,
    public pro_descuento: number,
    public pro_unidad_medida: string,
    public pro_IVA: number,
    public pro_ISR: number,
    public pro_IEPS: number,
    public pro_ISH: number,
    public pro_status: boolean,
    public codArticulo?:string,
    public pro_nombre_medida?: string,
  ){
  }
}

class unidadMedida {
  constructor(
    public id_unidad: string,
    public codigo: string,
    public nombre: string
  ){

  }
}

class claveProductoSat {
  constructor(
    public id_producto: string,
    public codigo: string,
    public nombre: string
  ){

  }
}

class claveProductoSatEmpresa {
  constructor(
    public id_producto_sat: string,
    public codigo: string,
    public nombre: string,
    public id_empresa: string
  ){

  }
}

class catUnidadMedidaSAT {
  constructor(
    public id_unidad_sat: string,
    public codigo: string,
    public nombre: string
  ){
  }
}

class catUnidadMedidaSATEmpresa {
  constructor(
    public id_unidad_sat: string,
    public codigo: string,
    public nombre: string,
    public id_empresa?:string
  ){
  }
}

class catProductoSAT {
  constructor(
    public id_unidad: string,
    public codigo: string,
    public nombre: string
  ){
  }
}