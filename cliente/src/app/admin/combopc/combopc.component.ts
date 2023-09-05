import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-combopc',
  templateUrl: './combopc.component.html',
  styleUrls: ['./combopc.component.scss']
})
export class CombopcComponent implements OnInit {
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
  productos=[];
  otros=[];
  elegidos=[];
  detalles=[];
  total=0;
  comp=false
  cam=false
  normal=false
  precios=[0,0,0,0,0,0,0,0,0,0]
  i=10
  ngOnInit(): void {
    this.agregar=this.createFormGroup();
    this.detalle.listar().subscribe((data:any)=>{
      this.detalles=data;
      // console.log(this.detalles)
    });
    this.producto.pc().subscribe((data:any)=>{
      this.productos=data
      // console.log(this.productos)
    });
    this.producto.otros().subscribe((data:any)=>{
      this.otros=data
      console.log(this.otros)
    });
  }

  constructor(private producto:ProductoService,private detalle:CategoriaService,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog) { 
  }
  base=environment.base+'producto/imagen/';
  llenar_imagen(img){    
    return this.base+img;
  }
  
  tipo(t):string{
    var x=""
    this.detalles.forEach(d => {
      if(d.tipo==t){
        x=d.descripcion
      }
    });
    return x;
  }
  push(f,i){
    if(i<10){
      this.precios[i]=f.precio_venta
    }
    else{
      this.precios[this.i]=f.precio_venta
      this.i++;
    }
    console.log(this.i)
    this.elegidos.push(f)
    this.total+=f.precio_venta
    console.log(this.elegidos)
  }
  eliminar(pos){
    console.log(pos)
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea quitar este Item?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        // this.laboratorios.push(this.laboratorios_elegidos[pos]);
        // this.n-= this.m_disponibles[pos];
        // this.m_disponibles.splice(pos,1);
        this.total-=this.elegidos[pos].precio_venta
        this.elegidos.splice(pos,1);
        // this.labos.splice(pos,1);
        // this.contador--;
        // this.k--;
        this.toastr.warning('Item Removido')
      }
      else
        this.toastr.info('Operacion Cancelada');
    }); 
  }

}
