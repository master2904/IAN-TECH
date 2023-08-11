import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-combo-camara',
  templateUrl: './combo-camara.component.html',
  styleUrls: ['./combo-camara.component.scss']
})
export class ComboCamaraComponent implements OnInit {
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      nombre:new FormControl('',[Validators.required,Validators.minLength(3)]),//, Validators.pattern(this.letras)]),
      nit:new FormControl('',[Validators.required,Validators.minLength(3)]),
    })}
  agregar:FormGroup;
  get nombre(){return this.agregar.get('nombre'); }
  get nit(){return this.agregar.get('nit'); }
  get f(){
    return this.agregar.controls;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
