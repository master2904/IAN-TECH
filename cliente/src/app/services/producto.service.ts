import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  base=environment.base;
  constructor( private http:HttpClient) { }
  listar(){
    return this.http.get(`${this.base}producto`);
  }
  pc(){
    return this.http.get(`${this.base}producto/pc/1`);
  }
  otros(){
    return this.http.get(`${this.base}producto/otros/1`);
  }
  buscar(id){
    return this.http.get(`${this.base}producto/`+id);
  }
  nuevo(form){
    // console.log(form);
    return this.http.post(`${this.base}producto`,form);
  }
  eliminar(id){
    // console.log(id);
    return this.http.delete(`${this.base}producto/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}producto/`+id, form);
  }  
  onUpload(file,nombre:string):Observable<any>{
    const fd= new FormData;
    fd.append('image',file,nombre);
    return this.http.post(`${this.base}producto/imagen`,fd); 
  }  
  cargar(nombre){
    return this.http.get(`${this.base}producto/imagen/`+nombre); 
  }}
