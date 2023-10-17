import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { Venta } from 'src/app/model/venta';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Equipo } from 'src/app/model/equipo';
import { Producto } from 'src/app/model/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-combo-camara-tienda',
  templateUrl: './combo-camara-tienda.component.html',
  styleUrls: ['./combo-camara-tienda.component.scss']
})
export class ComboCamaraTiendaComponent implements OnInit {

  titulos=['Grabador','Disco Duro','Balum Video','Plug Energia','Fuente','Cajas','Cable de Red','Monitor']
  ventas:Venta[]=[]
  historiales:Producto[]=[]
  grupo:Equipo[]=[]
  productos=[];
  elegidos=[0,0,0,0,0,0,0,0,0,0];
  precios =[0,0,0,0,0,0,0,0,0,0];
  extra=[]
  // ventas=[]
  total=0;
  createFormGroup(){
    return new FormGroup({
      monto: new FormControl("")
    })
  }
  agregar:FormGroup;
  get monto(){return this.agregar.get('monto'); }
  ngOnInit(): void {
    this.agregar=this.createFormGroup()
    this.producto.camara().subscribe((data:any)=>{
      this.productos=data[0]
      this.extra=data[1]
    });
  }

  constructor(private producto:ProductoService,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog,private venta:VentaService,private route:Router) { 
  }
  push(f,i){
    if(this.precios[i]>0){
      this.total=this.total-this.precios[i]
    }
    this.precios[i]=f.precio_tienda
    this.total=this.total+this.precios[i]
    this.elegidos[i]=f.id
  }
  pop(i){
    if(this.precios[i]>0){
      this.total=this.total-this.precios[i]
    }
    // this.total=this.total+this.precios[i]
    this.precios[i]=0
    this.elegidos[i]=0
    // console.log(this.elegidos)
    // console.log(this.precios)
  }
  saldo=0
  habilitado=false
  saldar(e){
    this.saldo= e-this.total
    this.habilitado=true
  }
  remove(i){
    this.total=this.total-this.historiales[i].precio_tienda
    this.historiales.splice(i,1); 
  }
  ex=0
  extras(d:Producto){
    this.ex=1
    // let form:Venta={id:0,id_usuario:+localStorage.getItem('data'),id_cliente:+localStorage.getItem('c'),fecha:'',total:0,monto:0}
    let x:Equipo={id_venta:0,id_producto:d.id,cantidad:1,precio:d.precio_tienda,total:d.precio_tienda}
    this.historiales.push(d);
    // console.log(this.historiales)
    this.total=this.total+d.precio_tienda
  }
  error_monto(){
    if(this.monto.hasError('required'))
      return "Ingrese monto a pagar"
    return ""
  }
  vender(){
    let f:Date = new Date
    let nombre=""+f.getFullYear()+"-"+(f.getMonth()+1)+"-"+(f.getDate());
    let formulario_venta:Venta={id:0,id_cliente:0,id_usuario:0,fecha:nombre,monto:0,total:0};
    formulario_venta.id=0
    formulario_venta.id_cliente=+localStorage.getItem('c')
    formulario_venta.id_usuario=+localStorage.getItem('data')
    formulario_venta.fecha=nombre
    formulario_venta.monto=this.monto.value
    formulario_venta.total=this.total
    let c=0
    this.elegidos.forEach(w=>{
      let formulario_historial:Equipo={id_venta:0,id_producto:0,cantidad:0,precio:0,total:0};
      formulario_historial.id_producto=w;
      formulario_historial.cantidad=1;
      formulario_historial.precio=this.precios[c]
      formulario_historial.total=this.precios[c]
      if(w!=0)
        this.grupo.push(formulario_historial)
      c++
    })
    this.historiales.forEach(w=>{
      let formulario_historial:Equipo={id_venta:0,id_producto:0,cantidad:0,precio:0,total:0};
      formulario_historial.id_producto=w.id
      formulario_historial.cantidad=1
      formulario_historial.precio=w.precio_tienda
      formulario_historial.total=w.precio_tienda
      this.grupo.push(formulario_historial)
    })
    
    let datos={datos:null,productos:null};
    datos.datos=formulario_venta
    datos.productos=this.grupo
    // console.log(datos)
    this.venta.nuevo(datos).subscribe((data:any)=>{
      // console.log(data)
      this.pdf(data,"Venta")
      // this.pdf(data,"Cotizacion")
      this.toastr.success('Combo Pc Vendido Exitosamente','Exito!')
    //   this.route.navigateByUrl("/admin/venta");
    //   location.reload();
    },
    error=>{
      this.toastr.error("No se pudo realizar la venta","Error")
    })
  }
  cotizacion(){
    let f:Date = new Date
    let nombre=""+f.getFullYear()+"-"+(f.getMonth()+1)+"-"+(f.getDate());
    let formulario_venta={id:0,nit:'',nombre:'',id_usuario:'',fecha:nombre,monto:0,total:0};
    formulario_venta.id=0
    formulario_venta.nit=localStorage.getItem('x')
    formulario_venta.nombre=localStorage.getItem('y')
    formulario_venta.id_usuario=localStorage.getItem('cuenta')
    formulario_venta.fecha=nombre
    formulario_venta.monto=this.monto.value
    formulario_venta.total=this.total
    let c=0
    let grupos=[]
    this.elegidos.forEach(w=>{
      let formulario_historial={id_producto:'',cantidad:0,precio:0,total:0};
      let data=''
      this.productos.forEach(vector=>{
        vector.forEach(p=>{
          // console.log(p)
          if(w==p.id){
            data=p.detalle
          }
        });
      });
      formulario_historial.id_producto=data;
      formulario_historial.cantidad=1;
      formulario_historial.precio=this.precios[c]
      formulario_historial.total=this.precios[c]
      if(w!=0)
        grupos.push(formulario_historial)
      c++
    })
    this.historiales.forEach(w=>{
      let formulario_historial={id_producto:'',cantidad:0,precio:0,total:0};
      formulario_historial.id_producto=w.detalle
      formulario_historial.cantidad=1
      formulario_historial.precio=w.precio_tienda
      formulario_historial.total=w.precio_tienda
      grupos.push(formulario_historial)
    })
    let datos:any[]=[formulario_venta,grupos]
    // console.log(datos)
    // {datos:null,productos:null};
    // datos=formulario_venta
    // datos.productos=this.grupo
    // console.log(datos)
    this.pdf(datos,"Cotizacion")
  }
  pdf(data,tipo){
    let v=data[0]
    let h=data[1]
    let datos=[]
    let c=1
    // console.log(h)
    h.forEach(w => {
      let t=[]
      // t.push(c++)
      t.push(w.cantidad)
      t.push(w.id_producto)
      t.push(w.precio)
      t.push(w.total)
      datos.push(t)
    });
    // console.log(v)
    let t=["TOTAL","","",v.total]
    datos.push(t)
    // console.log(datos)
    let fecha=new Date();
    let nombre=""+fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+(fecha.getFullYear());
    const titulo="venta "+fecha;
    const doc = new jsPDF('p', 'pt', 'a6');
    doc.setFont('helvetica','bold')
    doc.setFontSize(15);
    doc.text("IAN-TECH",100,25);
    doc.text(tipo,110,50);
    doc.setFont('helvetica','normal')
    doc.setFontSize(9);
    doc.text("Fecha: "+nombre,200,80);
    doc.text("NIT/CI:",30,80);
    doc.text("Nombre:",30,100);
    doc.text(v.nit,70,80)
    doc.text(v.nombre,70,100)
    doc.text("Total:                  ",30,120);
    doc.text("Monto Cancelado:        ",30,140);
    doc.text(v.total+" Bs.",120,120);
    doc.text(v.monto+" Bs.",120,140);
    doc.setFontSize(9);
    let cabeza=['CANTIDAD','DESCRIPCION','PRECIO','SUB TOTAL']
    autoTable(doc,{columns:cabeza,bodyStyles:{fontSize:8},body:datos,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[100,100,100],textColor:[255,255,255],fontSize:7},startY:160})
    addFooters(doc)
    doc.save(titulo+'.pdf')
  }
}
const addFooters = doc => {
  const pageCount = doc.internal.getNumberOfPages()
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8)
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.text('Usuario: ' + localStorage.getItem('nombre')+" "+localStorage.getItem('apellido'), 40, doc.internal.pageSize.height-10, {align:'left'})
    doc.text('Página ' + String(i) + ' de ' + String(pageCount), 550, doc.internal.pageSize.height-10, {align:'right'})
  }
}
