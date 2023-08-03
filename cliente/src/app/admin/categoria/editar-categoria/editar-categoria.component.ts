import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formularioCategoria } from '../formularioCategoria';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent implements OnInit {
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      descripcion:new FormControl('',[Validators.required,Validators.minLength(3)]),
      tipo:new FormControl('',[Validators.required]),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  agregar:FormGroup;
  get tipo(){return this.agregar.get('tipo'); }
  get descripcion(){return this.agregar.get('descripcion'); }
  constructor(public dialogRef: MatDialogRef<EditarCategoriaComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: formularioCategoria) {
      this.agregar=this.createFormGroup();
      this.agregar.controls['id'].setValue(data.id);
      this.agregar.controls['tipo'].setValue(data.tipo);
      this.agregar.controls['descripcion'].setValue(data.descripcion);
  }
  ngOnInit(): void {
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_tipo() {
    if (this.tipo.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return this.descripcion.hasError('pattern') ? 'Solo se aceptan letras y numeros' : '';
  }
  error_descripcion() {
    if (this.descripcion.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.descripcion.hasError('minLength'))
      return 'Ingrese minimo 3 caracteres';
    return this.descripcion.hasError('pattern') ? 'Solo se aceptan letras y numeros' : '';
  }
}
