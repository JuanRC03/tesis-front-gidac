import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AreaInvestigacionProyectoService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/area-investigacion-proyecto/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/area-investigacion-proyecto/actualizar`,modelo);
  }

  public listar(){
    return this.http.get(`${baserUrl}/area-investigacion-proyecto/listar`);
  }

  public listarPorProyecto(id:any){
    return this.http.get(`${baserUrl}/area-investigacion-proyecto/listar-por-proyecto/${id}`);
  }
}
