import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VentaService } from 'src/app/services/venta.service';
import { VerComponent } from './ver/ver.component';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  constructor(private venta:VentaService,private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  historial=[]
  transacciones=[]
  setear(fecha){
    let form={fecha:null}
    let nombre=""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+(fecha.getDate());
    form.fecha=nombre;
    this.venta.fecha(nombre).subscribe((data:any)=>{
      // console.log(data)
      this.historial=data[0];
      this.transacciones=data[1];
    })
  }
  ver(i) {
    const dialogo1 = this.dialog.open(VerComponent, {data:this.transacciones[i]});
  }
}