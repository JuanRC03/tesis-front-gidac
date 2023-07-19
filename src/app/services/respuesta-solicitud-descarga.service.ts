import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RespuestaSolicitudDescargaService {

  

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/respuesta-solicitud-descarga/guardar-respuesta-solicitud-descarga`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/respuesta-solicitud-descarga/guardar-respuesta-solicitud-descarga`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/respuesta-solicitud-descarga/obtener-respuesta-solicitud-descarga/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/respuesta-solicitud-descarga/listar-respuesta-solicitud-descarga`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/respuesta-solicitud-descarga/eliminar-respuesta-solicitud-descarga/${id}`); 
  }

  public obtenerSolicitudesDescargaAceptadas(id:any){
    return this.http.get(`${baserUrl}/respuesta-solicitud-descarga/aprobado/${id}`);
  }
  public obtenerSolicitudesDescargaRechazadas(id:any){
    return this.http.get(`${baserUrl}/respuesta-solicitud-descarga/rechazado/${id}`);
  }
}
