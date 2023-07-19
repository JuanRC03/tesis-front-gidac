import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LineaInvestigacionProyectoService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/linea-investigacion-proyecto/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/linea-investigacion-proyecto/actualizar`,modelo);
  }

  public listar(){
    return this.http.get(`${baserUrl}/linea-investigacion-proyecto/listar`);
  }

  public listarPorProyecto(id:any){
    return this.http.get(`${baserUrl}/linea-investigacion-proyecto/listar-por-proyecto/${id}`);
  }
}
