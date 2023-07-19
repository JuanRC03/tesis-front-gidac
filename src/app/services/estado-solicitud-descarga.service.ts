import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadoSolicitudDescargaService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/estado-solicitud-descarga/guardar-estado-solicitud-descarga`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/estado-solicitud-descarga/guardar-estado-solicitud-descarga`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/estado-solicitud-descarga/obtener-estado-solicitud-descarga/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/estado-solicitud-descarga/listar-estado-solicitud-descarga`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/estado-solicitud-descarga/eliminar-estado-solicitud-descarga/${id}`); 
  }
}