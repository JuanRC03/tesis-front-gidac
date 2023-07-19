import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadoSolicitudActualizarService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/estado-solicitud-actualizar/guardar-estado-solicitud-actualizar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/estado-solicitud-actualizar/guardar-estado-solicitud-actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/estado-solicitud-actualizar/obtener-estado-solicitud-actualizar/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/estado-solicitud-actualizar/listar-estado-solicitud-actualizar`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/estado-solicitud-actualizar/eliminar-estado-solicitud-actualizar/${id}`); 
  }
}