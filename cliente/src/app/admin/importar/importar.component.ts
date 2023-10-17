import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ConcursoService } from 'src/app/services/concurso.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { ProductoService } from 'src/app/services/producto.service';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.scss']
})
export class ImportarComponent implements OnInit {
  data: AOA = [];
  // [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  onFileChange(evt: any) {
    /* wire up file reader */
    this.lista=<File>evt.target.files[0];
    const ext=this.lista.name.split('.')[1];
    this.nombre_lista="prueba"+"."+ext;
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
//   files: File[] = [];

// onSelect(event) {
//   console.log(event);
//   // this.files.push(...event.addedFiles);
// }

// onRemove(event) {
//   console.log(event);
//   this.files.splice(this.files.indexOf(event), 1);
// }

  productos=[];  
  equipos=[];
  fequi=false;
  fcargado=false;
  id=null;
  cargar_excel(){
    this.fcargado=true;
  }
  createFormGroupFile(){
    return new FormGroup({
      file:new FormControl('',[Validators.required])
    });
  }
  listado:FormGroup;
  get file(){return this.listado.get('file');}
  cuentas(cuenta){
    return cuenta=="_"? "":cuenta;
  }
  constructor(private toast:ToastrService,private producto:ProductoService) {
  this.listado=this.createFormGroupFile();
  }
  ngOnInit(): void {
    this.producto.listar().subscribe((data:any)=>{
      this.productos=data
      // console.log(this.productos)
    })    
  }  
  lista:File=null;
  nombre_lista=null;
  cargar(event){
    this.lista=<File>event.target.files[0];
    const ext=this.lista.name.split('.')[1];
    this.nombre_lista="prueba"+"."+ext;
    // console.log(this.nombre_lista);
  }
  enviar(){
    this.producto.onUploadFile(this.lista,this.nombre_lista).subscribe(data=>{
      // this.productos=data;
      console.log(data);
      this.toast.success('Importacion exitosa');
    },
    error=>{
      this.toast.error('Revise los campos del EXCEL','Error');
      console.log(error.error);
    }); 
  }

  f_imagen=null;
  fileEvent(e){
    console.log("target: ");
    console.log(e);
    this.f_imagen=e.target.files[0];
  }
}
