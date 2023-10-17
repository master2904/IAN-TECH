import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';
import { Equipo } from 'src/app/model/equipo';
import { Venta } from 'src/app/model/venta';
import { Producto } from 'src/app/model/producto';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { Cliente } from 'src/app/model/cliente';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  ventas:Venta[]=[]
  historiales=[]
  grupo:Equipo[]=[]
  productos=[];
  extra=[]
  total=0;
  createFormGroup(){
    return new FormGroup({
      monto: new FormControl(""),
      obra: new FormControl(""),
      id_detalle:new FormControl('',Validators.required),
      descripcion: new FormControl("",Validators.required),
      precio: new FormControl("",Validators.required),      
      cantidad: new FormControl("",Validators.required),            
    })
  }
  agregar:FormGroup;
  get descripcion(){return this.agregar.get('descripcion'); }
  get cantidad(){return this.agregar.get('cantidad'); }
  get precio(){return this.agregar.get('precio'); }
  get id_detalle(){return this.agregar.get('id_detalle'); }
  get monto(){return this.agregar.get('monto'); }
  get obra(){return this.agregar.get('obra'); }
  ngOnInit(): void {
    this.agregar=this.createFormGroup()
    this.producto.listar().subscribe((data:any)=>{
      // this.productos=data[0]
      this.extra=data
      this.productos=data
      console.log(this.productos)
      this.cargar()
    });
  }
  filtroProducto: Observable<any[]>;
  filtro_productos: any[] = [];
  public form={id:null,id_usuario:null,codigo:null,id_cliente:null,id_detalle:null,descripcion:null,cantidad:null,precio:null,sub_total:null,fecha:null};
  setear_producto(s){
    this.form.id_detalle=s.id;
    this.form.descripcion=s.descripcion;
    this.form.codigo=s.codigo;
    this.form.cantidad=s.cantidad;
    this.form.precio=s.precio_tienda;
    this.agregar.controls['id_detalle'].setValue(s.id)
    this.agregar.controls['descripcion'].setValue(s.detalle)
    this.agregar.controls['precio'].setValue(s.precio_tienda)
    this.agregar.controls['cantidad'].setValue(s.cantidad)
   }  
  validar(e){
    if(this.form.cantidad<e)
      this.agregar.get('cantidad').setErrors({'max':this.form.cantidad})
  }
  private _filter_producto(value: string): Cliente[] {
    const filterValue = value.toLowerCase();
    return this.productos.filter(option => (option.detalle).toLowerCase().includes(filterValue));
  }
  cargar(){
    this.filtroProducto = this.descripcion.valueChanges.pipe(
      startWith(''),
      map(value => this._filter_producto(value || '')),
    );
    this.producto.listar().subscribe((data:any)=>{
      this.productos=data;
      this.filtro_productos = this.productos.map(w => {
        return {w}
      })
    });
  }
  constructor(private producto:ProductoService,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog,private venta:VentaService,private route:Router) { 
  }
  saldo=0
  habilitado=false
  saldar(e){
    this.saldo= e-this.total
    this.habilitado=true
  }
  sw=0
  ant=0
  obrar(e){
    if(this.sw==0){
      this.sw++
      this.total=this.total+(+e)
    }
    else{
      this.total=this.total-this.ant+(+e)
    }
    this.ant=e
    this.agregar.controls['obra'].setValue(e)
  }
  nuevo_producto(e){
    this.agregar.controls['descripcion'].setValue(e)
  }

  remove(i){
    this.total=this.total-(this.historiales[i].precio*this.historiales[i].cantidad)
    this.historiales.splice(i,1); 
  }
  ex=0
  extras(){
    let d={id:0,detalle:'',cantidad:0,precio:0,total:0}
    d.cantidad=this.agregar.controls['cantidad'].value
    d.precio=this.agregar.controls['precio'].value
    d.total=d.precio*d.cantidad
    d.detalle=this.agregar.controls['descripcion'].value
    d.id=this.agregar.controls['id_detalle'].value
    this.total=this.total+(d.total)
    this.historiales.push(d);
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
    this.grupo=[]
    // let formulario_historial:Equipo={id_venta:0,id_producto:0,cantidad:1,precio:this.obra.value,total:this.obra.value};
    // this.grupo.push(formulario_historial)
    this.historiales.forEach(w=>{
      let formulario_historial:Equipo={id_venta:0,id_producto:0,cantidad:0,precio:0,total:0};
      formulario_historial.id_producto=w.id
      formulario_historial.cantidad=w.cantidad
      formulario_historial.precio=w.precio
      formulario_historial.total=w.precio*w.cantidad
      this.grupo.push(formulario_historial)
    })
    let datos={datos:null,productos:null};
    datos.datos=formulario_venta
    datos.productos=this.grupo
    console.log(datos)
    this.venta.nuevo(datos).subscribe((data:any)=>{
      this.pdf(data,"Venta")
      this.toastr.success('Combo Pc Vendido Exitosamente','Exito!')
    
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
    // let formulario_historial={id_producto:'Mano de Obra',cantidad:1,precio:this.obra.value,total:this.obra.value};
    // grupos.push(formulario_historial)
    this.historiales.forEach(w=>{
      let formulario_historial={id_producto:'',cantidad:0,precio:0,total:0};
      formulario_historial.id_producto=w.detalle
      formulario_historial.cantidad=w.cantidad
      formulario_historial.precio=w.precio
      formulario_historial.total=w.precio*w.cantidad
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
    let t=["","","",v.total]
    datos.push(t)
    // console.log(datos)
    let fecha=new Date();
    let nombre=""+fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+(fecha.getFullYear());
    const titulo="venta "+fecha;
    const doc = new jsPDF('p', 'pt', 'a6');
    doc.setFont('helvetica','bold')
    doc.setFontSize(10);
    doc.text("IAN-TECH",120,25);
    doc.text(tipo,120,40);
    doc.setFont('helvetica','normal')
    doc.setFontSize(8);
    doc.text("Fecha: "+nombre,200,60);
    doc.text("NIT/CI:",30,60);
    doc.text("Nombre:",30,70);
    doc.text(v.nit,70,60)
    doc.text(v.nombre,70,70)
    doc.text("Total:               ",30,80);
    doc.text("Monto Cancelado:     ",30,90);
    doc.text(v.total+" Bs.",120,80);
    doc.text(v.monto+" Bs.",120,90);
    doc.setFontSize(8);
    let cabeza=['CANTIDAD','DESCRIPCION','PRECIO','SUB TOTAL']
    autoTable(doc,{columns:cabeza,bodyStyles:{fontSize:7},body:datos,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[100,100,100],textColor:[255,255,255],fontSize:5},startY:100})
    addFooters(doc)
    doc.save(titulo+'.pdf')
  }
  error_descripcion(){
    if(this.descripcion.hasError('required'))
      return 'campo requerido';
  }
  error_precio(){
    if(this.precio.hasError('required'))
      return 'campo requerido';
  }
  error_cantidad(){
    if(this.cantidad.hasError('required'))
      return "Campo Obligatorio";
    if(this.cantidad.hasError("min"))
      return "Cantidad Invalida"
    if(this.cantidad.hasError('max'))
      console.log(this.cantidad.status)
      return "Cantidad insuficiente en almacen";
    return "";
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
