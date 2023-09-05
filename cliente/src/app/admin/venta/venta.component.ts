import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { Cliente } from 'src/app/model/cliente';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  clientes=[]
  filtroCliente: Observable<Cliente[]>;
  filtro_clientes: any[] = [];
  constructor(private cliente:ClienteService) { 
  }
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
  private _filter(value: string): Cliente[] {
    const filterValue = value.toLowerCase();
    return this.clientes.filter(option => (option.nit).toLowerCase().includes(filterValue));
  }
  cargar(){
    this.filtroCliente = this.nit.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.cliente.listar().subscribe((data:Cliente[])=>{
      this.clientes=data;
      this.filtro_clientes = this.clientes.map(w => {
        return {id:w.id,nit:w.nit,nombre:w.nombre}
      })
    })
  }

  ngOnInit():void{
    this.agregar=this.createFormGroup()
    this.cargar()
  }
  nuevo_nit(e){
    this.agregar.controls['nit'].setValue(e)
    console.log(e)
  }
  setear_cliente(s){
    // console.log(s)
    this.agregar.controls['nombre'].setValue(s.nombre);
    this.agregar.controls['nit'].setValue(s.nit);
    localStorage.setItem('c',s.id);
    this.venta=s.tipo
  }
  error_nit(){
    if(this.nit.hasError('required'))
      return "Campo Obligatorio"
  }
  venta=0
  tipo=0
}
  
