import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { CategoriaService } from '../../services/categoria.service';
import { ConcursoService } from '../../services/concurso.service';
import { formularioConcurso } from '../concurso/formularioConcurso';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { formularioCategoria } from './formularioCategoria';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  filterpost=[];
  id_concurso=0;
  agregar() {
    let datos=new formularioCategoria(0,"",0);
    const dialogo1 = this.dialog.open(CrearCategoriaComponent, {data:datos});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.nuevo(art.value);
      else
        this.toastr.info('Operacion Cancelada')
    }
    );
  }
  editar(datos) {
    const dialogo1 = this.dialog.open(EditarCategoriaComponent, {data:datos});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.update(art.value);
      else
        this.toastr.info('Operacion Cancelada')
    }
    );
  }
  concurso:formularioConcurso;
  detalles=[];
  categorias=[];
  cat=null;
  constructor(private categoria:CategoriaService,private toastr:ToastrService,private dialog:MatDialog,private dialogo:MatDialog) { }
  ngOnInit(): void {
    this.categoria.listar().subscribe((data:any)=>{
      this.detalles=data;
    });
  }
  listar_id(datos){
    this.id_concurso=datos.id;
    this.concurso=datos;
    this.cat=true;
    this.categoria.listar_id(datos.id).subscribe((data:any)=>{
      this.categorias=data;
    });
  }
  nuevo(datos){
    let formulario= new formularioCategoria(0,datos.descripcion,datos.tipo);
    this.categoria.nuevo(formulario).subscribe((data:any)=>{
      this.detalles=data;
      console.log(formulario);
      this.toastr.success("Categoria Creada",'Exito!');
    });
  }
  
  eliminar(id): void {
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar esta Categoria?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.categoria.eliminar(id).subscribe((data:any)=>{
          this.detalles=data;
          this.toastr.success("Tipo Eliminado",'')
        });          
      } else {
        this.toastr.info('Operacion Cancelada','');
      }
    });
  }
  update(datos) {
    let formulario= new formularioCategoria(datos.id,datos.descripcion,datos.tipo);
    console.log(formulario);
    this.categoria.update(formulario.id, formulario).subscribe((data:any) => {
      this.detalles=data;
      this.toastr.success("Tipo Actualizado",'Exito!');
    });
  }
}
