import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class InvestigacionService {

  constructor(private httpClient: HttpClient) { }

  public añadirInvestigacion(investigacion:any){
    return this.httpClient.post(`${baserUrl}/api/investigacion`,investigacion);
  }

  public listarInvestigaciones(){
    return this.httpClient.get(`${baserUrl}/api/investigacion`);
  }

  public listarInvestigacionesPublicas(){
    return this.httpClient.get(`${baserUrl}/api/investigacion-publicas`);
  }

  public obtenerProyectoInvestigacion(id:any){
    return this.httpClient.get(`${baserUrl}/api/obtener-proyecto-investigacion/${id}`);
  }

  public listarInvestigacionesMapa(){
    return this.httpClient.get(`${baserUrl}/api/investigacion-mapa`);
  }
  
  public eliminarInvestigacion(id:any){
    return this.httpClient.delete(`${baserUrl}/api/eliminar-proyecto-investigacion/${id}`);
  }

  public restaurarInvestigacion(id:any){
    return this.httpClient.get(`${baserUrl}/api/restaurar-proyecto-investigacion/${id}`);
  }
  
  public cambioEstadoProyectoInvestigacion(id:any){
    return this.httpClient.get(`${baserUrl}/api/investigacion/cambio-estado-proyecto-investigacion/${id}`);
  }
  
}
