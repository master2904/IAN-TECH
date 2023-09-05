import { Component, OnInit } from '@angular/core';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { Cliente } from 'src/app/model/cliente';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  clientes=[]
  filterpost=[];
  id_concurso=0;
  agregar() {
    let  datos:Cliente
    const dialogo1 = this.dialog.open(CrearClienteComponent, {data:datos});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.nuevo(art.value);
      else
        this.toastr.info('Operacion Cancelada')
    }
    );
  }
  editar(datos) {
    const dialogo1 = this.dialog.open(EditarClienteComponent, {data:datos});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.update(art.value);
      else
        this.toastr.info('Operacion Cancelada')
    }
    );
  }
  constructor(private cliente:ClienteService,private toastr:ToastrService,private dialog:MatDialog,private dialogo:MatDialog) { }
  ngOnInit(): void {
    this.cliente.listar().subscribe((data:Cliente[])=>{
      this.clientes=data;
    });
  }
  nuevo(datos){
    let formulario:Cliente={id:0,nit:'',nombre:'',tipo:0}
    formulario.id=0
    formulario.nit=datos.nit
    formulario.nombre=datos.nombre
    formulario.tipo=datos.tipo
    this.cliente.nuevo(formulario).subscribe((data:Cliente[])=>{
      this.clientes=data;
      // console.log(formulario);
      this.toastr.success("Cliente Creado",'Exito!');
    });
  }
  
  eliminar(id): void {
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar este Cliente?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.cliente.remove(id).subscribe((data:Cliente[])=>{
          this.clientes=data;
          this.toastr.success("Cliente Eliminado",'')
        });          
      } else {
        this.toastr.info('Operacion Cancelada','');
      }
    });
  }
  tipo(t){
    return (t==2)?"Cliente":"Cliente Tienda";
  }
  update(datos) {
    let formulario:Cliente={id:0,nit:'',nombre:'',tipo:0}
    formulario.id=datos.id
    formulario.nit=datos.nit
    formulario.nombre=datos.nombre
    formulario.tipo=datos.tipo
    // console.log(formulario);
    this.cliente.update(formulario.id, formulario).subscribe((data:Cliente[]) => {
      this.clientes=data;
      this.toastr.success("Cliente Actualizado",'Exito!');
    });
  }
}
