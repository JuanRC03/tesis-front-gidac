import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlturaService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/altura/guardar-altura`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/altura/guardar-altura`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/altura/obtener-altura/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/altura/listar-altura`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/altura/eliminar-altura/${id}`); 
  }
}