import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  constructor(private producto:ProductoService,private detalle:CategoriaService,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog) { 
  }
  ngOnInit():void{
  }
  combo1=false;
  combo2=false;
  combo3=false;
  pc(){
    this.combo1=true;
    this.combo2=false;
    this.combo3=false;
  }
  camara(){
    this.combo1=false;
    this.combo2=true;
    this.combo3=false;
  }
  simple(){
    this.combo1=false;
    this.combo2=false;
    this.combo3=true;
  }

}
