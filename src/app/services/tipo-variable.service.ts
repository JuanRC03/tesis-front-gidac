import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoVariableService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/tipo-variable/guardar-tipo-variable`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/tipo-variable/guardar-tipo-variable`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/tipo-variable/obtener-tipo-variable/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/tipo-variable/listar-tipo-variable`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/tipo-variable/eliminar-tipo-variable/${id}`); 
  }
}
