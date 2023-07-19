import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RespuestaSolicitudActualizarService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/respuesta-solicitud-actualizar/guardar-respuesta-solicitud-actualizar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/respuesta-solicitud-actualizar/guardar-respuesta-solicitud-actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/respuesta-solicitud-actualizar/obtener-respuesta-solicitud-actualizar/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/respuesta-solicitud-actualizar/listar-respuesta-solicitud-actualizar`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/respuesta-solicitud-actualizar/eliminar-respuesta-solicitud-actualizar/${id}`); 
  }

  public obtenerSolicitudesActualizarAceptadas(id:any){
    return this.http.get(`${baserUrl}/respuesta-solicitud-actualizar/aprobado/${id}`);
  }
  public obtenerSolicitudesActualizarRechazadas(id:any){
    return this.http.get(`${baserUrl}/respuesta-solicitud-actualizar/rechazado/${id}`);
  }
}
