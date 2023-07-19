import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SectorImpactoProyectoService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/sector-impacto-proyecto/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/sector-impacto-proyecto/actualizar`,modelo);
  }

  public listar(){
    return this.http.get(`${baserUrl}/sector-impacto-proyecto/listar`);
  }
  public listarPorProyecto(id:any){
    return this.http.get(`${baserUrl}/sector-impacto-proyecto/listar-por-proyecto/${id}`);
  }
}
