import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParcelaService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/parcela/guardar-parcela`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/parcela/actualizar-parcela`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/parcela/obtener-parcela/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/parcela/listar-parcela`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/parcela/eliminar-parcela/${id}`); 
  }

  public obtenerPorConglomerado(id:any){
    return this.http.get(`${baserUrl}/parcela/obtener-parcela/por-conglomerado/${id}`);
  }
}