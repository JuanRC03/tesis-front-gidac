import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConglomeradoService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/conglomerado/guardar-conglomerado`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/conglomerado/guardar-conglomerado`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/conglomerado/obtener-conglomerado/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/conglomerado/listar-conglomerado`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/conglomerado/eliminar-conglomerado/${id}`); 
  }

  public obtenerPorProyecto(id:any){
    return this.http.get(`${baserUrl}/conglomerado/obtener-conglomerado/por-proyecto/${id}`);
  }
  
}