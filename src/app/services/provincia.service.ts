import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {


  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/provincia/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/provincia/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/provincia/obtener/${id}`);
  }

  public obtenerPorPais(id:any){
    return this.http.get(`${baserUrl}/provincia/obtener/por-pais/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/provincia/listar`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/provincia/eliminar/${id}`); 
  }
}
