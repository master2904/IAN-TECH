import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {
  file:File=null;
  nombre=null;
  createFormGroup(){
    return new FormGroup({
      id: new FormControl('',[Validators.required]),
      codigo: new FormControl('',[Validators.required]),
      detalle: new FormControl('',[Validators.required]),
      precio_compra: new FormControl('',[Validators.required,Validators.min(1)]),
      precio_tienda: new FormControl('',[Validators.required,Validators.min(1)]),
      precio_final: new FormControl('',[Validators.required,Validators.min(1)]),
      cantidad: new FormControl('',[Validators.required]),
      id_detalle: new FormControl('',[Validators.required]),
      imagen: new FormControl('',[Validators.required]),
      marca:new FormControl('',Validators.required),
      relacion:new FormControl(),
      img:new FormControl()
    });
  }
  agregar:FormGroup;
  get id(){return this.agregar.get('id');}
  get codigo(){return this.agregar.get('codigo');}
  get detalle(){return this.agregar.get('detalle');}
  get marca(){return this.agregar.get('marca');}
  get precio_compra(){return this.agregar.get('precio_compra');}
  get precio_tienda(){return this.agregar.get('precio_tienda');}
  get precio_final(){return this.agregar.get('precio_final');}
  get cantidad(){return this.agregar.get('cantidad');}
  get id_detalle(){return this.agregar.get('id_detalle');}
  get relacion(){return this.agregar.get('relacion');}
  get imagen(){return this.agregar.get('imagen');}
  get img(){return this.agregar.get('img');}
  get f(){
    return this.agregar.controls;
  }
  cargarImagen(event){
    this.file=<File>event.target.files[0]
    const ext=this.file.name.split('.')[1];
    let fecha=new Date();  
    this.nombre=""+fecha.getFullYear()+(fecha.getMonth()+1)+(fecha.getDay()+1)+fecha.getHours()+fecha.getMinutes()+fecha.getSeconds();
    this.nombre=this.nombre+"."+ext;
    // console.log(this.nombre);
  }
  enviarImagen(){
    this.producto.onUpload(this.file,this.nombre).subscribe(data=>{
      console.log(data);
    },
    error=>{
      console.log(<any>error);
    }); 
  }
  detalles=[]
  constructor(
    public dialogRef: MatDialogRef<EditarProductoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Producto,private producto:ProductoService) {
    this.agregar=this.createFormGroup();
    console.log(data)
    this.detalles=data['v']
    data=data['f']
    this.agregar.controls['id'].setValue(data.id);
    this.agregar.controls['detalle'].setValue(data.detalle);
    this.agregar.controls['cantidad'].setValue(data.cantidad);
    this.agregar.controls['codigo'].setValue(data.codigo);
    this.agregar.controls['id_detalle'].setValue(data.id_detalle);
    this.agregar.controls['marca'].setValue(data.marca);
    this.agregar.controls['relacion'].setValue(data.relacion);
    this.agregar.controls['precio_compra'].setValue(data.precio_compra);
    this.agregar.controls['precio_final'].setValue(data.precio_final);
    this.agregar.controls['precio_tienda'].setValue(data.precio_tienda);
    this.agregar.controls['imagen'].setValue("");
    this.agregar.controls['img'].setValue("");
  }
  nuevo(){
    this.enviarImagen();
    this.agregar.controls['img'].setValue(this.nombre);
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_detalle() {
    if (this.detalle.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.detalle.hasError('minlength'))
      return 'minom 3 letras';
    if(this.detalle.hasError('pattern'))
      return 'Ingrese Mayusculas';
  }
  error_id_detalle() {
    if (this.id_detalle.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  error_marca() {
    if (this.marca.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  error_imagen() {
    if (this.imagen.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  error_codigo() {
    if (this.codigo.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.codigo.hasError('pattern'))
      return 'Solo se aceptan letras y numeros';
  }
  error_cantidad() {
    if (this.cantidad.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.cantidad.hasError('pattern'))
      return 'Solo se aceptan letras';
  }
  error_precio_compra() {
    if (this.precio_compra.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.precio_compra.hasError('min'))
      return 'No se aceptan cantidades negativas';
  }
  error_precio_tienda() {
    if (this.precio_tienda.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.precio_tienda.hasError('min'))
      return 'No se aceptan cantidades negativas';
  }
  error_precio_final() {
    if (this.precio_final.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.precio_final.hasError('min'))
      return 'No se aceptan cantidades negativas';
  }
  ngOnInit(): void {
    this.detalles=this.data['v']
    // console.log(this.data)
  }
}
