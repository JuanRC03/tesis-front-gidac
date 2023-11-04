import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/dataset/guardar-dataset`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/dataset/actualizar-dataset`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/dataset/obtener-dataset/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/dataset/listar-dataset`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/dataset/eliminar-dataset/${id}`); 
  }

  public obtenerPorParcela(id:any){
    return this.http.get(`${baserUrl}/dataset/obtener-dataset/por-parcela/${id}`);
  }
  
}