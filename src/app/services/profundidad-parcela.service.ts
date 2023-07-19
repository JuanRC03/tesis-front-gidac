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
    return this.http.put(`${baserUrl}/profundidad-parcela/guardar-profundidad-parcela`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/profundidad-parcela${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/profundidad-parcela/listar-profundidad-parcela`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/profundidad-parcela${id}`); 
  }
}