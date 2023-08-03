import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  base=environment.base;
  constructor(private http:HttpClient) { }
  listar_id(id){    
    return this.http.get(`${this.base}detalle/`+id);
  }
  listar(){
    return this.http.get(`${this.base}detalle`);
  }
  // maximo(id){
  //   return this.http.get(`${this.base}categoria/maxima/`+id);
  // }
  buscar(id){
    return this.http.get(`${this.base}detalle/`+id);
  }
  conjunto(id,n,form){
    return this.http.post(`${this.base}detalle/conjunto/`+id+"/"+n,form);
  }
  nuevo(form){
    // console.log(form);
    return this.http.post(`${this.base}detalle`,form);
  }
  eliminar(id){
    // console.log(id);
    return this.http.delete(`${this.base}detalle/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}detalle/`+id, form);
  }
}
