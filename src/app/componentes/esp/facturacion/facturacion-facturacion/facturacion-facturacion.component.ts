import { Component, OnInit } from '@angular/core';
import { FacturacionFacturacionServicioService } from "../../../../servicios/facturacion/facturacion-facturacion-servicio.service";
import { ServiceConsultaCliente } from "../../../../servicios/cliente/consulta-cliente.service";
import { ProductosFacturacionServicioService } from "../../../../servicios/productos/productos-facturacion-servicio.service";
import { UsoCfdiService } from '../../../../servicios/sat/uso-cfdi.service'; 
import { FormaPagoService } from '../../../../servicios/sat/forma-pago.service';
import { TipoRelacionService } from '../../../../servicios/sat/tipo-relacion.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UnidadmedidadService } from "../../../../servicios/sat/unidadmedidad.service";
import { saveAs } from 'file-saver';




declare var $:any;
@Component({ 
  selector: 'app-facturacion-facturacion',
  templateUrl: './facturacion-facturacion.component.html',
  styleUrls: ['./facturacion-facturacion.component.css']
})
export class FacturacionFacturacionComponent implements OnInit { 
  //Opciones de facuracion
  pestanaFactura =[{
    id:1,
    nombrePestanaFac:'Enviar factura'
  },
  {
    id:2,
    nombrePestanaFac:'Descargar factura'
  }]

  //Tipo de documento INGRESO O EGRESO
  TipoDocumentos = [{
    codigo: 0, 
    tipo: "INGRESO"
  },{
    codigo: 1,
    tipo: "EGRESO"
  }];

  //Tipo de moneda peso o Dolar
  TipoModena = [{
    codigo: 0,
    tipo: "PESO"
  },{
    codigo: 1,
    tipo: "DOLAR"
  }];

  //Metodo de pago en una sola Exibicion o pagos por parcialidades
  MetodoPago = [{
    metodoPagoCodigo: "PUE",
    metodoPagoNombre: "PAGO EN UNA SOLA EXHIBICIÓN"
  },{
    metodoPagoCodigo: "PPD",
    metodoPagoNombre: "PAGO EN PARCIALIDADES O DIFERIDO"
  }]

  precio_sin_iva: number;
  arreglo = new Array();

//  factura = new Factura('','','','','','','','','','','','','','','','','','',0,0,0);
  cliente = new Cliente('','','','','','','','','','','','','','','',0);
  producto = new Producto('',0,0,0,0,0,0,'','','','',null,'');
  productoAgregado = new Array();
  productoImpuestoAgregado = new Array();
  productoImpuestos = new Producto('',0,0,0,0,0,0,'','','','',null,'');
  //uso CFDI
  usoCFDI = new UsoCFDI('','','');
  unidades:any;
  //Forma Pago
  formaPago = new FormaPago('','','');
  //tipo relacion
  tipoRelacion = new TipoRelacion('','','');
  //factura ddl
  facturaDDL = new Factura2('','','','','',0,String((new Date().getDate())).padStart(2,'0')+'/'+ String(new Date().getMonth()+1).padStart(2,'0') + '/' + new Date().getFullYear(),'','','','','','',0,0,'',0,0,0,0,0,0,'','','','','','','','','','','','','','',1,0,0,0,0,0,0,0,0,true,false,0,0,0,0,0,0);
  //detalle producto
  detalleProducto = new Array();
  nombrePDF:string = '';
  correoFactura:any ={correo:'',cc:''};
  correosFactura = new Array();
  loading: boolean;

  constructor(private facturacionFacturacionServicioService:FacturacionFacturacionServicioService,
    private serviceConsultaCliente:ServiceConsultaCliente,
    private productosFacturacionServicioService:ProductosFacturacionServicioService,
    private _usoCfdiService:UsoCfdiService,
    private _formaPagoService:FormaPagoService,
    private _tipoRelacionService:TipoRelacionService,
    private unidadmedidadService:UnidadmedidadService,
    public toast:ToastrManager,) { 
    this.traerClientes();
    this.traerArticulos();
    this.traerUsoCFDI();
    this.traerFormaPago();
    this.traerTipoRelacion();
    this.traerMedidasSat();    
  }

  ngOnInit() {
    if (this.facturaDDL.fac_factura_tipodoc == 0) {
            $("#notaCredito").hide();      
          }                           
  }

pruebass() {
  if (this.facturaDDL.fac_pago_formapago_codigo != '99') {
    this.toast.errorToastr('No es por definir');
  }

}

//Traer articulos
  traerArticuloClick = async(index)=> {
    this.facturaDDL.fac_pro_idprodcto_interna = this.producto[index].pro_clave;
    this.facturaDDL.fac_pro_claveprod_sat = this.producto[index].pro_clave_sat;
    this.facturaDDL.fac_pro_nombre = this.producto[index].pro_nombre;
    this.facturaDDL.fac_pro_unidadmedida_codigo_sat = this.producto[index].pro_unidad_medida;
    this.facturaDDL.fac_pro_precio = this.producto[index].pro_precio;
    this.facturaDDL.fac_pro_importe = this.facturaDDL.fac_pro_importe;
    this.facturaDDL.fac_pro_descuento_siva = this.producto[index].pro_descuento;
    

    //Precio sin iva 
    if (this.producto[index].pro_IVA == 1) {
      this.facturaDDL.fac_precio_sin_iva = this.producto[index].pro_precio / ( 1 + 0.16);
      console.log('Precio sin IVA', this.facturaDDL.fac_precio_sin_iva);
    }  

    if (this.producto[index].pro_IVA == 0) {
      this.facturaDDL.fac_precio_sin_iva = 0;
      this.facturaDDL.fac_pro_descuento = 0;
      console.log('Precio sin IVA', this.facturaDDL.fac_precio_sin_iva);
      console.log('Precio sin IVA', this.facturaDDL.fac_precio_sin_iva);
    }  
  

    //Descuento sin iva Cuando tiene IVA y descuento
    if (this.producto[index].pro_descuento > 0 && this.producto[index].pro_IVA == 1 ) {      
      this.producto.pro_descuento = 0;
      this.facturaDDL.fac_pro_descuento_siva = (this.producto[index].pro_descuento / 100) * this.producto[index].pro_precio;
      console.log('DESCUENTO A APLICAR',this.facturaDDL.fac_pro_descuento_siva);
      this.facturaDDL.fac_pro_descuento = this.facturaDDL.fac_pro_descuento_siva / (1 + 0.16);      
      console.log('Descuento SIN IVA',this.facturaDDL.fac_pro_descuento, 'Condicion IVA Y DESCUENTO');
    } 

    //Descuento sin iva Cuando tiene IVA pero no descuento
    if(this.producto[index].pro_IVA == 1 && this.producto[index].pro_descuento <= 0) {      
      this.producto.pro_descuento = 0;
      this.facturaDDL.fac_pro_descuento_siva = (this.producto[index].pro_descuento / 100) * this.producto[index].pro_precio;
      console.log('DESCUENTO A APLICAR',this.facturaDDL.fac_pro_descuento_siva);
      this.facturaDDL.fac_pro_descuento = this.facturaDDL.fac_pro_descuento_siva / (1 + 0.16);
      console.log('Descuento SIN IVA',this.facturaDDL.fac_pro_descuento, 'Condicion de IVA, no descuento');
    }

    //Descuento sin iva Cuando se tiene descuento pero no IVA
    if (this.producto[index].pro_IVA == 0 && this.producto[index].pro_descuento > 0) {            
      this.producto.pro_descuento = 0;
      this.facturaDDL.fac_pro_descuento_siva = (this.producto[index].pro_descuento / 100) * this.producto[index].pro_precio;
      console.log('DESCUENTO A APLICAR',this.facturaDDL.fac_pro_descuento_siva);
     // this.facturaDDL.fac_pro_descuento = this.producto[index].pro_precio - this.facturaDDL.fac_pro_descuento_siva;
      this.facturaDDL.fac_pro_descuento = this.facturaDDL.fac_pro_descuento_siva * this.facturaDDL.fac_pro_cantidad;
      console.log('Descuento SIN IVA',this.facturaDDL.fac_pro_descuento, 'Condicion de NO IVA, SI descuento');
      console.log('cantidad', this.facturaDDL.fac_pro_cantidad, 'del productos', this.facturaDDL.fac_pro_nombre);
      console.log('precio', this.facturaDDL.fac_pro_precio, 'del productos', this.facturaDDL.fac_pro_nombre);
      /*descuento * cantidad */
    }


      //Descuento sin iva Cuando No se tiene IVA ni DESCUENTO
      if (this.producto[index].pro_IVA == 0 && this.producto[index].pro_descuento == 0) {            
        this.facturaDDL.fac_pro_descuento = 0;
        console.log('Descuento SIN IVA',this.facturaDDL.fac_pro_descuento, 'Condicion de NO IVA, NO descuento');
      }

    this.facturaDDL.fac_pro_unidadmedida_nombre_sat = this.unidades.filter((unidad) => {
      return unidad.codigo  == this.facturaDDL.fac_pro_unidadmedida_codigo_sat;
    })
    this.facturaDDL.fac_pro_unidadmedida_nombre_sat = this.facturaDDL.fac_pro_unidadmedida_nombre_sat[0]["nombre"];
  }

  //Agregar un producto en un array
  agregarProducto() {
    if(this.facturaDDL.fac_pro_idprodcto_interna != null) {
      this.productoAgregado.push({
        fac_pro_idprodcto_interna: this.facturaDDL.fac_pro_idprodcto_interna,
        fac_pro_claveprod_sat: this.facturaDDL.fac_pro_claveprod_sat,
        fac_pro_nombre: this.facturaDDL.fac_pro_nombre,
        fac_pro_unidadmedida_codigo_sat: this.facturaDDL.fac_pro_unidadmedida_codigo_sat,
        fac_pro_unidadmedida_nombre_sat:this.facturaDDL.fac_pro_unidadmedida_nombre_sat,
        fac_pro_precio: this.facturaDDL.fac_pro_precio,
        fac_pro_importe: (Number(this.facturaDDL.fac_pro_precio * this.facturaDDL.fac_pro_cantidad)),
        fac_pro_descuento_siva: this.facturaDDL.fac_pro_descuento_siva,       
        fac_pro_cantidad: this.facturaDDL.fac_pro_cantidad,
        fac_pro_ish_producto:this.facturaDDL.fac_pro_isr_producto,
        fac_pro_iva_producto: (Number((this.facturaDDL.fac_precio_sin_iva - this.facturaDDL.fac_pro_descuento)*0.16) * this.facturaDDL.fac_pro_cantidad),
        fac_precio_sin_iva:Number(this.facturaDDL.fac_precio_sin_iva),
        fac_pro_descuento:Number(this.facturaDDL.fac_pro_descuento)
      })

      this.productoImpuestoAgregado.push({
        pro_iva:this.productoImpuestos.pro_iva,
        pro_isr:this.productoImpuestos.pro_isr,
        pro_ish:this.productoImpuestos.pro_ish
      })
      

      this.arreglo.push(this.facturaDDL.fac_pro_descuento_siva);
       
      console.log('Producto Agregago',this.productoAgregado);              
      this.calcularPagos();      
    }
  }

  //Calcular pagos
  calcularPagos(tipo?,cantidad?) {
    this.facturaDDL.fac_pago_valordolar = cantidad || this.facturaDDL.fac_pago_valordolar;
    this.facturaDDL.fac_pago_tipomoneda = tipo || this.facturaDDL.fac_pago_tipomoneda;
    
    this.facturaDDL.fac_oper_subtotal = 0;
    this.facturaDDL.fac_oper_descuento = 0;  
    this.facturaDDL.fac_oper_iva_total = 0;
    this.facturaDDL.fac_oper_isr_total = 0;
    this.facturaDDL.fac_oper_ish_total = 0;
    this.facturaDDL.fac_oper_total = 0;
   // this.precio_sin_iva = 0;
    this.facturaDDL.fac_aux_sub_noIva = 0;
    this.facturaDDL.fac_aux_sub_siIVa = 0;    

      for(let x=0; x<this.productoAgregado.length; x++) {   
           
        //Sub-total                
        if (this.productoAgregado[x].fac_precio_sin_iva <= 0) {      
          console.log('PRECIO SIN IVA NO HAY');    
          this.facturaDDL.fac_aux_sub_noIva = this.facturaDDL.fac_aux_sub_noIva + Number(this.productoAgregado[x].fac_pro_precio * this.productoAgregado[x].fac_pro_cantidad); 
          this.productoAgregado[x].fac_precio_sin_iva = 0;  
          console.log('Precio SIN IVA, cuando el producto no contiene IVA', this.productoAgregado[x].fac_precio_sin_iva);        
          console.log('cantidad Sub-total con IVA',this.productoImpuestoAgregado[x].fac_pro_cantidad);        
          console.log('Sub-total con IVA',this.facturaDDL.fac_aux_sub_noIva);
          console.log('cantidad producto', this.productoAgregado[x].fac_pro_cantidad, 'del producto', this.facturaDDL.fac_pro_nombre);
          console.log('precio producto', this.productoAgregado[x].fac_pro_precio, 'del producto', this.facturaDDL.fac_pro_nombre);
        }
        
        if (this.productoAgregado[x].fac_precio_sin_iva > 0) {
          console.log('PRECIO SIN IVA SI HAY');
          this.facturaDDL.fac_aux_sub_siIVa = this.facturaDDL.fac_aux_sub_siIVa + Number( this.productoAgregado[x].fac_precio_sin_iva * this.productoAgregado[x].fac_pro_cantidad);   
          //console.log(this.facturaDDL.fac_pro_cantidad);                               
          console.log('cantidad Sub-total sin IVA',this.productoImpuestoAgregado[x].fac_pro_cantidad);
          console.log('Sub-total sin IVA',this.facturaDDL.fac_aux_sub_siIVa);
          console.log('cantidad', this.facturaDDL.fac_pro_cantidad, 'del productos', this.facturaDDL.fac_pro_nombre);
          console.log('precio', this.facturaDDL.fac_pro_precio, 'del productos', this.facturaDDL.fac_pro_nombre);
        }    

        this.facturaDDL.fac_oper_subtotal = this.facturaDDL.fac_aux_sub_noIva + this.facturaDDL.fac_aux_sub_siIVa;
        console.log('SUB-TOTAL TOTAL',this.facturaDDL.fac_oper_subtotal);

        //DESCUENTO   
        this.facturaDDL.fac_oper_descuento = this.facturaDDL.fac_oper_descuento + Number(this.productoAgregado[x].fac_pro_descuento * this.productoAgregado[x].fac_pro_cantidad);
        console.log('DESCUENTO TOTAL', this.facturaDDL.fac_oper_descuento);

        //IVA
        if (this.productoAgregado[x].fac_precio_sin_iva > 0) {
          console.log('El producto lleva IVA');
          this.facturaDDL.fac_oper_iva_total = this.facturaDDL.fac_oper_iva_total + Number((this.productoAgregado[x].fac_precio_sin_iva - this.productoAgregado[x].fac_pro_descuento) * 0.16) * this.productoAgregado[x].fac_pro_cantidad;
          console.log(this.productoAgregado[x].fac_precio_sin_iva,'Aqui precio sin IVA en IVA');        
          console.log('IVA TOTAL',this.facturaDDL.fac_oper_iva_total);
        }
        
       
       
       
        this.limpiarProductoAgregados();        
      }

      //TOTAL
      this.facturaDDL.fac_oper_total = (this.facturaDDL.fac_oper_subtotal - this.facturaDDL.fac_oper_descuento) + this.facturaDDL.fac_oper_iva_total; 
      
      console.log('TOTAL CUENTA',this.facturaDDL.fac_oper_total);   

      console.log('AQUI TERMINA UN PRODUCTO');

      if(this.facturaDDL.fac_pago_tipomoneda == 1) {
        this.facturaDDL.fac_oper_subtotal = this.facturaDDL.fac_oper_subtotal / Number(this.facturaDDL.fac_pago_valordolar);
        this.facturaDDL.fac_oper_descuento = this.facturaDDL.fac_oper_descuento / Number(this.facturaDDL.fac_pago_valordolar);
        this.facturaDDL.fac_oper_iva_total = this.facturaDDL.fac_oper_iva_total / Number(this.facturaDDL.fac_pago_valordolar);
        this.facturaDDL.fac_oper_isr_total = this.facturaDDL.fac_oper_isr_total / Number(this.facturaDDL.fac_pago_valordolar);
        this.facturaDDL.fac_oper_ish_total = this.facturaDDL.fac_oper_ish_total / Number(this.facturaDDL.fac_pago_valordolar);
      }
    
  }

  //Elimina un producto agregado
  eliminarProducto(index) {
    this.productoAgregado.splice(index,1);
    this.calcularPagos();
  }

  //Realizar Factura
    hacerFactura = async () => {
      this.loading = true;
    if(!(this.facturaDDL.ivaProductoCheck && this.facturaDDL.isrProductoCheck)) {
      this.facturaDDL.ivaProductoCheck = true;
    }
      if (this.facturaDDL.fac_factura_tipodoc == 0) {
      this.facturaDDL.fac_nocre_foliorel = '0';
      this.facturaDDL.fac_nocre_tiporelacion_codigo = '0';      
    }

    console.log('Forma de pago',this.facturaDDL.fac_pago_formapago_codigo);

    let factura = {
      fac_cliente_nombre:this.facturaDDL.fac_cliente_nombre,
      fac_cliente_RFC:this.facturaDDL.fac_cliente_RFC,
      fac_cliente_usoCDFI_codigo:this.facturaDDL.fac_cliente_usoCDFI_codigo,
      fac_cliente_domicilio:this.facturaDDL.fac_cliente_domicilio,
      fac_cliente_cp:this.facturaDDL.fac_cli_cp,
      fac_factura_tipodoc:this.facturaDDL.fac_factura_tipodoc,
      fac_pago_formapago_codigo:this.facturaDDL.fac_pago_formapago_codigo,
      fac_pago_metodopago:this.facturaDDL.fac_pago_metodopago,
      fac_pago_tipomoneda:this.facturaDDL.fac_pago_tipomoneda,
      fac_pago_valordolar:this.facturaDDL.fac_pago_valordolar,
      fac_oper_subtotal:this.facturaDDL.fac_oper_subtotal,
      fac_oper_descuento:this.facturaDDL.fac_oper_descuento,
      fac_oper_iva_total:this.facturaDDL.fac_oper_iva_total,
      fac_oper_isr_total:this.facturaDDL.fac_oper_isr_total,
      fac_oper_ish_total:this.facturaDDL.fac_oper_ish_total,
      fac_oper_total:this.facturaDDL.fac_oper_total,
      fac_nocre_foliorel:this.facturaDDL.fac_nocre_foliorel,
      fac_nocre_tiporelacion_codigo:this.facturaDDL.fac_nocre_tiporelacion_codigo,
      ivaProductoCheck:this.facturaDDL.ivaProductoCheck,
      isrProductoCheck:this.facturaDDL.isrProductoCheck,
      productos:this.productoAgregado
    }
    
    try {
      let facturaExito = await this.facturacionFacturacionServicioService.hacerFactura(factura)
      console.log('Factura realizada con exito',facturaExito);
      this.nombrePDF = facturaExito["folio"];
      this.productoAgregado.length = 0;      
      this.loading = false;
      this.toast.successToastr('Exito','Factura Realizada con exito');      
      $("#modalFacturaD").modal();      
    } catch (error) {     
      this.loading = false; 
      console.log('Error no se hizo la factura',error);      
    }
  }

    //Descargar PDF
    funcionDescargarPDF = async() => {
      this.loading = true;
      try {
        let ext = ['pdf','xml'];
      for(let x = 0; x < ext.length;x++) {
        let pdf = await this.facturacionFacturacionServicioService.funcionPDF('descargar',this.nombrePDF,ext[x]);
        saveAs(pdf,'07523eb1-28fe-45a5-bf58-eb2f69eb49b3');
        this.loading = false;        
        console.log('PDF descargado',pdf)
        this.toast.successToastr('Exito','Se ha descargado tu factura');        
        }
      } catch (error) {
        this.loading = false;
        this.toast.errorToastr('Error','Error al descargar factura')        
        console.log('Error al descargar PDF',error);
      }
    }

    //Enviar PDF
    funcionEnviarPDF = async () => {
      this.loading = true;
      try {
        let enviarZip = await this.facturacionFacturacionServicioService.funcionPDFEnviar('enviar', this.nombrePDF,{correos:this.correosFactura,cc:this.correoFactura.cc});
        this.loading = false;
        console.log('Enviar PDF',enviarZip);        
        this.toast.successToastr('Exito','Se envio su factura');
      } catch (error) {     
        this.loading = false;   
        this.toast.errorToastr('Error','Algo salio mal intentelo de neuvo');
        console.log('Error al enviar PDF',error)
      }
    }

    //Agregar correo
    agregarCorreoFactura= async() => {      
    if(this.correoFactura.correo != '' ) {
      if(this.correosFactura.length == 0) {        
        this.correosFactura.push({correo:this.correoFactura.correo});
        this.correoFactura.correo = '';
      }else {
        for(let x = 0; x < this.correosFactura.length;x++) {
            if(this.correosFactura[x].correo == this.correoFactura.correo){              
              break;              
            }  
            if(x == this.correosFactura.length-1) {
              this.correosFactura.push({correo:this.correoFactura.correo});              
            }
          }
        this.correoFactura.correo = '';
      }
    }
    } 

    //Eliminar correo de tabla
    eliminarCorreoFactura = async (correoBorrar) =>{
    this.correosFactura = this.correosFactura.filter((correo) => {
      return correo.correo != correoBorrar.correo;
    })
    }
 
    //GET Medidas SAT
    traerMedidasSat = async () => {
      this.loading = true;
      try {
        this.unidades = await this.unidadmedidadService.traerMedidasSAT();
        this.unidades = this.unidades["_unidadesMedidaSAT"];      
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log('Error Unidades Medida SAT',error);
      }
    }
  
    //GET Articulos
    traerArticulos = async () => {
      this.loading = true;
      try {
        let producto = await this.productosFacturacionServicioService.traerArticulos();
        this.producto = producto["articulos"];
        this.loading = false;
        console.log('Get Productos',this.producto);        
      } catch (error) {
        this.loading = false;
        console.log('Error Articulos',error);
      }
     }
    
    //GET Clientes 
    traerClientes= async () => {
      try {
      let clientes = await this.serviceConsultaCliente.getListaClientes()
      this.cliente = clientes["clientes"];
      } catch (error) {
        console.log('Error Clientes',error)
      }
  
    }
  
    //GET Cliente
    TraerClienteClick(index) {
      this.facturaDDL.fac_cliente_RFC = this.cliente[index].cli_rfc;
      this.facturaDDL.fac_cliente_nombre = this.cliente[index].cli_nombre;
      this.facturaDDL.fac_cliente_domicilio = this.cliente[index].cli_direccion;
      this.facturaDDL.fac_cli_cp = this.cliente[index].cli_cp;
    }
  
    //GET unidades medidas SAT
    traerUnidadMedidaSat = async(codigo)=> {
        try {
          let medida = await this.unidadmedidadService.traerMedidasSatID(codigo)
          console.log('GET Unidades de medida SAT',medida)
        } catch (error) {
          console.log('Error Unidades de medida SAT',error);
        }
    }
  
    //GET Uso CFDI
    traerUsoCFDI = async () => {
      try{
        let _usocfdisat = await this._usoCfdiService.traerUcfiSAT();
        this.usoCFDI = _usocfdisat["_usoCFDISAT"];
        console.log('Get CFDI', this.usoCFDI);        
      } catch (error) {
        console.log('Error CFDI',error);
      }
    }

   //GET Forma de pago
   traerFormaPago = async () => {
    try{
      let _formaPagoSAT = await this._formaPagoService.traerFormaPagoSAT();
      this.formaPago = _formaPagoSAT["_formaPagoSATNode"];
      console.log('Get formaPago', this.formaPago);
    } catch (error) {
      console.log('Error en Forma de pago',error);
    }
  }

  //GET Tipo Relacion
  traerTipoRelacion = async () => {
    try {
      let _tipoRelacionSAT = await this._tipoRelacionService.traerTipoRelacionSAT();
      this.tipoRelacion = _tipoRelacionSAT["_tiporelacionNODE"];
      console.log('Get Tipo Relacion', this.tipoRelacion);
    } catch (error) {
      console.log('Error tipo de relacion',error);
    }
  }

  //limpiar datos productos
  limpiarProductoAgregados(){
    this.facturaDDL.fac_pro_idprodcto_interna = null;
    this.facturaDDL.fac_pro_nombre = null;
    this.facturaDDL.fac_pro_unidadmedida_codigo_sat = null;
    this.facturaDDL.fac_pro_unidadmedida_nombre_sat = null;
    this.facturaDDL.fac_pro_precio = null;
    this.facturaDDL.fac_pro_descuento_siva = null;
    this.facturaDDL.fac_pro_cantidad = 1;
    this.facturaDDL.fac_pro_descuento = null;
    

    this.productoImpuestos.pro_iva = 0;
    this.productoImpuestos.pro_isr = 0;
    this.productoImpuestos.pro_ish = 0;
  }

  //limpiar Datos clientes
  limpiarCliente(){
    this.facturaDDL.fac_cliente_RFC = null;
    this.facturaDDL.fac_cli_cp = null;
    this.facturaDDL.fac_cliente_domicilio = null;
    this.facturaDDL.fac_cliente_nombre = null;
    this.facturaDDL.fac_cliente_usoCDFI_codigo = null;
  }
  
  //productosFacturacionServicioService
  /*seleccionarProductoClave () {
    this.productosFacturacionServicioService.seleccionararticuloClave(this.producto.pro_clave)    
    .then((producto:any) => {
      console.log(producto.result[0]);
      this.facturaDDL.fac_pro_nombre = producto.result[0].pro_nombre;
      this.facturaDDL.fac_pro_unidadmedida_nombre_sat = producto.result[0].pro_unidad_medida;        
      this.facturaDDL.fac_pro_precio = producto.result[0].pro_precio; 
      this.facturaDDL.fac_pro_descuento = producto.result[0].pro_descuento; 
      // facturaDDL.fac_pro_idprodcto_interna
      this.toast.successToastr('Exito','Se encontro');
    })
    .catch((err) => {
      console.log('Error al traer pro_clavee',err);
      this.toast.errorToastr('Error','No existe');
    })
  }*/



}

class Cliente{
  constructor(
    public cli_nombre: string,
    public cli_apell_paterno: string,
    public cli_apell_materno: string,
    public cli_estado: string,
    public cli_localidad: string,
    public cli_ciudad: string,
    public cli_pais: string,
    public cli_direccion: string,
    public cli_numInt: string,
    public cli_numExt: string,
    public cli_colonia: string,
    public cli_cp: string,
    public cli_rfc: string,
    public cli_telefono: string,
    public cli_email: string,
    public cli_codempresa: number,
    public cli_codcliente?:string){

  }
}

class Producto {
  constructor(
    public pro_nombre: string,
    public pro_precio: number,
    public pro_costo: number,
    public pro_descuento: number,
    public pro_iva: number,
    public pro_ish: number,
    public pro_isr: number,
    public pro_unidad_medida: string,
    public pro_cod_cliente: string,
    public pro_clave: string,
    public pro_emp_cod:string,
    public pro_status:boolean,
    public codArticulo?:string
  ){
  }
}

class UsoCFDI {
  constructor(
    public cfdi_id_uso_cfdi: string,
    public cfdi_codigo: string,
    public cfdi_nombre: string
  ){
  }
}

class FormaPago {
  constructor(
    public fpago_id_formapago_sat: string,
    public fpago_codigo: string,
    public fpago_nombre: string,
  ){}
}

class TipoRelacion {
  constructor(
    public trelacion_id: string,
    public trelacion_codigo: string,
    public trelacion_nombre: string,
  ){
  }
}

class Factura2{
  constructor(
    //Cliente
    public fac_cliente_nombre: string,
    public fac_cliente_RFC: string,
    public fac_cliente_usoCDFI_codigo: string,  //codigo SAT
    public fac_cliente_domicilio:string,
    public fac_cli_cp:string,
    //Datos Factura
    public fac_factura_tipodoc: number,  //0 ingreso 1 egreso
    public fac_factura_fecha: string,
    //Empresa
    public fac_empresa_rfc: string,
    public fac_empresa_regimenfisca_codigo: string,
    public fac_empresa_razonsocial: string,
    public fac_empresa_cp: string,
    //Detalle pago
    public fac_pago_formapago_codigo: string,
    public fac_pago_metodopago: string,
    public fac_pago_tipomoneda: number,
    public fac_pago_valordolar: number,
    public  observaciones:string,
    //Operacionales
    public fac_oper_subtotal: number,
    public fac_oper_descuento: number,
    public fac_oper_iva_total: number,
    public fac_oper_isr_total: number,
    public fac_oper_ish_total: number,
    public fac_oper_total: number,
    //Nota credito
    public fac_nocre_foliorel: string,
    public fac_nocre_tiporelacion_codigo: string,
    //Configuracion empresa
    public fac_conf_rutaxlm: string,
    public fac_conf_rutallave: string,
    public fac_conf_rutacertificado: string,
    public fac_conf_rutalogo: string,
    public fac_conf_contraseña_llave: string,
    public fac_conf_licencia: string,
    public fac_conf_status: string,   //esta se quitara y se pondra por un campo diferente
    //fac_conf_xml: FileReader, // aqui va el XML
    //detalle producto
    public fac_pro_claveprod_sat: string,
    public fac_pro_idprodcto_interna: string,
    public fac_pro_unidadmedida_codigo_sat: string,
    public fac_pro_unidadmedida_nombre_sat: string,
    public fac_pro_nombre: string,
    public fac_pro_cantidad: number,
    public fac_pro_precio: number,
    public fac_pro_importe: number, //importe tiene que ir 0
    public fac_pro_descuento_siva: number,
    public fac_pro_ishdelproducto: number,
    public fac_pro_descuento: number,
    public fac_pro_trasladobase: number,
    public fac_pro_trasladoimporte: number,
    public fac_pro_trasladoiva: number,
    public ivaProductoCheck:boolean,
    public isrProductoCheck:boolean,
    public fac_pro_isr_producto: number,  
    public fac_pro_iva_producto: number,
    public fac_aux_sub_noIva,
    public fac_aux_sub_siIVa,
    public fac_precio_sin_iva,
    public fac_pro_IVA_tasa
  ){}
}



