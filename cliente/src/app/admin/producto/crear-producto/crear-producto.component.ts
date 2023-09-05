import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  numero:any=/[0-9]+/;
  sigla:any=/[A-Z1-9]/;
  alfabeto:any=/[A-Za-z0-9 ]{5,30}/;
  letras:any=/[A-Za-z ]{5,30}/;
  file:File=null;
  nombre=null;
  createFormGroup(){
    return new FormGroup({
<<<<<<< HEAD
=======
      id: new FormControl('',[Validators.required]),
>>>>>>> c02702d1b0090c749dd8720a5ed219c610187062
      codigo: new FormControl('',[Validators.required]),
      detalle: new FormControl('',[Validators.required]),
      marca: new FormControl('',[Validators.required]),
      precio_compra: new FormControl('',[Validators.required]),
      precio_venta: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required]),
      id_detalle: new FormControl('',[Validators.required]),
<<<<<<< HEAD
      imagen: new FormControl('',[Validators.required]),
      marca:new FormControl('',Validators.required),
      img:new FormControl()
=======
      relacion: new FormControl('',[Validators.required]),
      imagen: new FormControl('',[Validators.required]),
>>>>>>> main
    });
  }
  agregar:FormGroup;
  get id(){return this.agregar.get('id');}
  get codigo(){return this.agregar.get('codigo');}
  get detalle(){return this.agregar.get('detalle');}
  get marca(){return this.agregar.get('marca');}
  get precio_compra(){return this.agregar.get('precio_compra');}
  get precio_venta(){return this.agregar.get('precio_venta');}
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
  constructor(
    public dialogRef: MatDialogRef<CrearProductoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Producto,private producto:ProductoService) {
    this.agregar=this.createFormGroup();
  }
  nuevo(){
<<<<<<< HEAD
    this.enviarImagen();
    this.agregar.controls['img'].setValue(this.nombre);
=======
    this.enviarArchivo();
    console.log(this.agregar)
    // this.agregar.controls['img'].setValue(this.nombre);
>>>>>>> main
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
<<<<<<< HEAD
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
=======
>>>>>>> main
  error_codigo() {
    if (this.codigo.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.codigo.hasError('pattern'))
      return 'Solo se aceptan letras y numeros';
  }
  error_marca() {
    if (this.cantidad.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.cantidad.hasError('pattern'))
      return 'Solo se aceptan letras';
  }
  detalles=[]
  ngOnInit(): void {
    this.detalles=this.data['v']
    // console.log(this.data)
  }

}
