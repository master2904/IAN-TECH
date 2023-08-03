import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formularioCategoria } from '../formularioCategoria';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.scss']
})
export class CrearCategoriaComponent implements OnInit {
  alfabeto:any=/[A-Za-z0-9]{3,40}/;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      descripcion:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern(this.alfabeto)]),
      tipo:new FormControl('',[Validators.required,Validators.min(1),Validators.max(1000)]),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  agregar:FormGroup;
  get tipo(){return this.agregar.get('tipo'); }
  get descripcion(){return this.agregar.get('descripcion'); }
  constructor(public dialogRef: MatDialogRef<CrearCategoriaComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: formularioCategoria) {
      this.agregar=this.createFormGroup();
  }
  ngOnInit(): void {
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_tipo() {
    if (this.tipo.hasError('required')) 
      return 'Este campo es obligatorio';
    if (this.tipo.hasError('min')) 
      return 'Numeros Positivos'
    return '';
  }
  error_descripcion() {
    if (this.descripcion.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.descripcion.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    return this.descripcion.hasError('pattern') ? 'Ingrese letras y/o numeros' : '';
  }
}
