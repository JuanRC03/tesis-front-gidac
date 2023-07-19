import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class ParroquiaService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/parroquia/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/parroquia/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/parroquia/obtener/${id}`);
  }

  public obtenerPorCanton(id:any){
    return this.http.get(`${baserUrl}/parroquia/obtener/por-canton/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/parroquia/listar`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/parroquia/eliminar/${id}`); 
  }
}
