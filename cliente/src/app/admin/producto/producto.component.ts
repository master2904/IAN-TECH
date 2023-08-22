import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { environment } from 'src/environments/environment.prod';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Producto } from 'src/app/model/producto';
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
      console.log(this.dataSource)
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
      // let data: Producto;
      // const dialogo1 = this.dialog.open(CrearProductoComponent, {data});
      // dialogo1.afterClosed().subscribe(art => {
      //   if (art != undefined)
      //     this.nuevo(art.value);
      //   else
      //   this.toastr.info('Operacion Cancelada','');
      // }
      // );
  nuevo(f){}
}
