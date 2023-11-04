import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudAccesoService {

  constructor(private http:HttpClient) { }

  public getCantidadSolicitudes(id:any){
    return this.http.get(`${baserUrl}/solicitud/contador-solicitudes/${id}`);
  }

  public getCantidadSolicitude(){
    return this.http.get(`${baserUrl}/solicitud/contador-solicitudes`);
  }

  public listarSolicitados(id:any){
    return this.http.get(`${baserUrl}/solicitud/solicitado/${id}`);
  }

  public enviarSolictudDescarga(Solicitud:any){
    return this.http.post(`${baserUrl}/solicitud/guardar-solicitud-descarga`,Solicitud);
  }
  
  public solicitudAprobada(idSolicitud:any){
    return this.http.get(`${baserUrl}/solicitud/solicitud-aprobada/${idSolicitud}`);
  }

  public solicitudRechazada(id:any, respuesta:any){
    return this.http.get(`${baserUrl}/solicitud/solicitud-rechazada/${id}/${respuesta}`);
  }

  //Eliinar datos
  
  public enviarSolicitudEliminar(id:any, idProyInv:any, idUsuario:any,motivo:any){
    return this.http.get(`${baserUrl}/solicitud/guardar-solicitud-eliminar/${id}/${idProyInv}/${idUsuario}/${motivo}`);
  }

  public aprobarSolicitudEliminar(id:any){
    return this.http.get(`${baserUrl}/solicitud/aprobar-solicitud-eliminar/${id}`);
  }

  public rechazarSolicitudEliminar(id:any, motivo:any){
    return this.http.get(`${baserUrl}/solicitud/rechazadar-solicitud-eliminadar/${id}/${motivo}`);
  }

  public listarSolicitadosEliminar(id:any){
    return this.http.get(`${baserUrl}/solicitud/solicitado-eliminar/${id}`);
  }

  public getSolicitadosEliminar(){
    return this.http.get(`${baserUrl}/solicitud/get-solicitados-eliminar`);
  }

  public getAceptadosEliminar(){
    return this.http.get(`${baserUrl}/solicitud/get-aprobados-eliminar`);
  }

  public getRechazadosEliminar(){
    return this.http.get(`${baserUrl}/solicitud/get-rechazados-eliminar`);
  }

}
