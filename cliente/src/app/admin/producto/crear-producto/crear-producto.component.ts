import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  public previsualizacion:string
  numero:any=/[0-9]+/;
  sigla:any=/[A-Z1-9]/;
  alfabeto:any=/[A-Za-z0-9 ]{5,30}/;
  letras:any=/[A-Za-z ]{5,30}/;
  file:File=null;
  nombre=null;
  createFormGroup(){
    return new FormGroup({
      id: new FormControl('',),
      codigo: new FormControl('',[Validators.required]),
      detalle: new FormControl('',[Validators.required]),
      marca: new FormControl('',[Validators.required]),
      precio_compra: new FormControl('',[Validators.required]),
      precio_tienda: new FormControl('',[Validators.required]),
      precio_final: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required]),
      id_detalle: new FormControl('',[Validators.required]),
      imagen: new FormControl('',[Validators.required]),
      img:new FormControl(),
      relacion: new FormControl(''),
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
    let e=this.file.name.split('.');
    let ext=e[e.length-1]
    let fecha=new Date();  
    this.nombre=""+fecha.getFullYear()+(fecha.getMonth()+1)+(fecha.getDay()+1)+fecha.getHours()+fecha.getMinutes()+fecha.getSeconds();
    this.nombre=this.nombre+"."+ext;
    this.extraer64(this.file).then((imagen:any)=>{
      this.previsualizacion=imagen.base;
      console.log(imagen)
    })
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
  constructor(
    public dialogRef: MatDialogRef<CrearProductoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Producto,private producto:ProductoService,private sanitizer:DomSanitizer) {
    this.agregar=this.createFormGroup();
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
  error_precio_compra() {
    if (this.precio_compra.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  error_precio_tienda() {
    if (this.precio_tienda.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  error_precio_final() {
    if (this.precio_final.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  error_cantidad() {
    if (this.cantidad.hasError('required')) {
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
  detalles=[]
  ngOnInit(): void {
    this.detalles=this.data['v']
    // console.log(this.data)
  }
  extraer64 = async ($event:any) => new Promise((resolve,reject) => {
    try{
      const unsafeImg=window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustHtml(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve(
        {base:reader.result}
        )
      };
      reader.onerror=error=>{
        base:null
      }
    }
    catch(e){
      return null
    }
  })  
}
