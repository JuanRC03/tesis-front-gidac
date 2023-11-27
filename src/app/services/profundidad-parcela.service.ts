import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfundidadParcelaService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/profundidad-parcela/guardar-profundidad-parcela`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/profundidad-parcela/actualizar-profundidad-parcela`,modelo);
  }

  public obtener(idProfundidad:any, idParcela:any){
    return this.http.get(`${baserUrl}/profundidad-parcela/obtener-profundidad-parcela/por-profunidad-parcela/${idProfundidad}/${idParcela}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/profundidad-parcela/listar-profundidad-parcela`);
  }

  public eliminar(idProfundidad:any, idParcela:any){
    return this.http.delete(`${baserUrl}/profundidad-parcela/eliminar/${idProfundidad}/${idParcela}`); 
  }

  public obtenerPorParcela(id:any){
    return this.http.get(`${baserUrl}/profundidad-parcela/listar-profundidad-parcela/por-parcela/${id}`);
  }
}