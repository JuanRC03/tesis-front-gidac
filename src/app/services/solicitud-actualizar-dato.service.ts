import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudActualizarDatoService {

  constructor(private http:HttpClient) { }
  
  public enviarSolicitudEliminar(id:any, idProyInv:any,motivo:any){
    return this.http.get(`${baserUrl}/solicitud/guardarSolicitudEliminar/${id}/${idProyInv}/${motivo}`);
  }

  public aprobarSolicitudEliminar(id:any){
    return this.http.get(`${baserUrl}/solicitud/aprobarSolicitudEliminar/${id}`);
  }

  public rechazarSolicitudEliminar(id:any, motivo:any){
    return this.http.get(`${baserUrl}/solicitud/rechazadarSolicitudEliminadar/${id}/${motivo}`);
  }

  public getSolicitadosEliminar(){
    return this.http.get(`${baserUrl}/solicitud/getSolicitadosEliminar`);
  }

  public getAceptadosEliminar(){
    return this.http.get(`${baserUrl}/solicitud/getAprobadosEliminar`);
  }

  public getRechazadosEliminar(){
    return this.http.get(`${baserUrl}/solicitud/getRechazadosEliminar`);
  }
}