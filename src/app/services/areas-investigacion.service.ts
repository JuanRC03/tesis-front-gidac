import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AreasInvestigacionService {

  constructor(private httpClient: HttpClient) { }

    public aniadirAreaInvestigacion(AreaInvestigacion:any){
      return this.httpClient.post(`${baserUrl}/area-investigacion/guardar-area-investigacion`,AreaInvestigacion);
    }

    public obtenerAreaInvestigacion(idAreaInvestigacion:any){
      return this.httpClient.get(`${baserUrl}/area-investigacion/obtener-area-investigacion/${idAreaInvestigacion}`);
    }

    public obtenerAreasInvestigacion(){
      return this.httpClient.get(`${baserUrl}/area-investigacion/mostrar-areas-investigacion`);
    }

    public obtenerAreasInvestigacionVigentes(){
      return this.httpClient.get(`${baserUrl}/area-investigacion/listar-area-investigacion-vigentes`);
    }
    
    public obtenerAreasInvestigacionEliminadas(){
      return this.httpClient.get(`${baserUrl}/area-investigacion/listar-area-investigacion-eliminadas`);
    }

    public eliminarAreaInvestigacion(idAreaInvestigacion:any){
      return this.httpClient.delete(`${baserUrl}/area-investigacion/eliminar-area-investigacion/${idAreaInvestigacion}`);
    }

    public restaurarAreaInvestigacion(idAreaInvestigacion:any){
      return this.httpClient.get(`${baserUrl}/area-investigacion/reestablecer-vigencia/${idAreaInvestigacion}`);
    }
}
