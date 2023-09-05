import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/model/cliente';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      nit:new FormControl('',[Validators.required]),
      tipo:new FormControl('',[Validators.required]),
      nombre:new FormControl('',[Validators.required])
    });
  }
  agregar:FormGroup;
  get tipo(){return this.agregar.get('tipo'); }
  get nombre(){return this.agregar.get('nombre'); }
  get nit(){return this.agregar.get('nit'); }
  constructor(public dialogRef: MatDialogRef<EditarClienteComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Cliente) {
      this.agregar=this.createFormGroup();
      this.agregar.controls['id'].setValue(data.id);
      this.agregar.controls['nit'].setValue(data.nit);
      this.agregar.controls['nombre'].setValue(data.nombre);
      this.agregar.controls['tipo'].setValue(data.tipo);
  }
  ngOnInit(): void {
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_nit() {
    if (this.nit.hasError('required')) 
      return 'Este campo es obligatorio';
  }
  error_tipo() {
    if (this.tipo.hasError('required')) 
      return 'Este campo es obligatorio';
    if (this.tipo.hasError('min')) 
      return 'Numeros Positivos'
    return '';
  }
  error_nombre() {
    if (this.nombre.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.nombre.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    return this.nombre.hasError('pattern') ? 'Ingrese letras y/o numeros' : '';
  }
}
