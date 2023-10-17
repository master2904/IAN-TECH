import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { environment } from 'src/environments/environment.prod';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Producto } from 'src/app/model/producto';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
export interface PeriodicElement {
    id: string;
		codigo: string;
		imagen: string;
		detalle: string;
		marca: string;
		precio_compra: string;
		precio_venta: string;
		cantidad: string;
		id_detalle: string;
		relacion: string;
		created_at:string;
		updated_at: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})


export class ProductoComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'imagen', 'detalle', 'marca','precio_compra','precio_venta','cantidad','tipo','opcion'];
  dataSource = ELEMENT_DATA;
  constructor(private producto:ProductoService, private detalle:CategoriaService,private toastr:ToastrService,private dialog:MatDialog,public dialogo: MatDialog) { }
  productos=[]
  detalles=[]
  ngOnInit(): void {
    this.detalle.listar().subscribe((data:any)=>{
      this.detalles=data;
    });
    this.producto.listar().subscribe((data:any)=>{
      this.productos=data;
      this.dataSource=data;
      // console.log(this.dataSource)
    });
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
  base=environment.base+'producto/imagen/';
  llenar_imagen(img){    
    // console.log(this.base+img)
    return this.base+img;
  }
  
  agregar(){
    const dialogConfig = new MatDialogConfig();
    let datos:Producto
    dialogConfig.data={datos,v:this.detalles};
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogo1 = this.dialog.open(CrearProductoComponent, dialogConfig);
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.nuevo(art.value);
      else
        this.toastr.info('Operacion Cancelda');
      }
    );
  }
  editar(f:Producto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={f,v:this.detalles};
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogo1 = this.dialog.open(EditarProductoComponent, dialogConfig);
    // const dialogo1 = this.dialog.open(EditarProductoComponent, {data:f});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.update(art.value);
      else
      this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  eliminar(id): void {
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar este Producto?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        if(id>1){
          this.producto.eliminar(id).subscribe((data:any)=>{
            // console.log(data);
            this.productos=data;
            this.toastr.success('Producto Eliminado','')
          });
        }
        else {
          this.toastr.error("No puede eliminar este producto",'Error!');
        }
      }
      else
        this.toastr.info('Operacion Cancelada','');
    });
  }
  update(f) {
    // console.log(f)
    let formulario:Producto={id:0,codigo:0,detalle:'',marca:'',precio_compra:0,precio_final:0,precio_tienda:0,cantidad:0,id_detalle:0,relacion:0,imagen:''}
    formulario.id=f.id;
    formulario.codigo=f.codigo;
    formulario.detalle=f.detalle;
    formulario.marca=f.marca;
    formulario.precio_compra=f.precio_compra;
    formulario.precio_final=f.precio_final;
    formulario.precio_tienda=f.precio_tienda;
    formulario.cantidad=f.cantidad;
    formulario.id_detalle=f.id_detalle;
    formulario.relacion=0;
    formulario.imagen=f.img;
    console.log(formulario)
    this.producto.update(formulario.id,formulario).subscribe((data:any) => {
      this.toastr.success("Producto Actualizado",'Exito!');
      this.productos=data;
    },
    error=>{
        this.toastr.error("No se pudo actualizar",'Error!');
        console.log(error.error.error);
    });  
  }
    
  nuevo(f){
    let formulario:Producto={id:0,codigo:0,detalle:'',marca:'',precio_compra:0,precio_final:0,precio_tienda:0,cantidad:0,id_detalle:0,relacion:0,imagen:''}
    formulario.id=0;
    formulario.codigo=f.codigo;
    formulario.detalle=f.detalle;
    formulario.marca=f.marca;
    formulario.precio_compra=f.precio_compra;
    formulario.precio_final=f.precio_final;
    formulario.precio_tienda=f.precio_tienda;
    formulario.cantidad=f.cantidad;
    formulario.id_detalle=f.id_detalle;
    formulario.relacion=0;
    formulario.imagen=f.img;
    console.log(formulario)
    this.producto.nuevo(formulario).subscribe((data:any)=>{
      this.productos=data;
      this.toastr.success("Producto agregado exitosamente","Exito")
    },
    error=>{
      this.toastr.error("Revise sus campos","Error")
    }
    )    
  }
}
