import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CantonService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/canton/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/canton/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/canton/obtener/${id}`);
  }

  public obtenerPorProvincia(id:any){
    return this.http.get(`${baserUrl}/canton/obtener/por-provincia/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/canton/listar`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/canton/eliminar/${id}`); 
  }
}
