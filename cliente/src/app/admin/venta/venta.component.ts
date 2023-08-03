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
  ngOnInit():void{}
  combo_1(){
    // this.comp=true
    // this.cam=false
    // this.normal=false
  }
  combo_2(){
    // this.comp=false
    // this.cam=true
    // this.normal=false
  }
  venta(){
    // this.comp=false
    // this.cam=false
    // this.normal=true
  }

  }
