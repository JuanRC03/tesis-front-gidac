import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionProyectoService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/localizacion-proyecto/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/localizacion-proyecto/actualizar`,modelo);
  }

  public listar(){
    return this.http.get(`${baserUrl}/localizacion-proyecto/listar`);
  }

  public listarPorProyecto(id:any){
    return this.http.get(`${baserUrl}/localizacion-proyecto/listar-por-proyecto/${id}`);
  }

  public eliminar(idPoryecto:any,idLocalizacion:any){
    return this.http.delete(`${baserUrl}/localizacion-proyecto/eliminar/${idPoryecto}/${idLocalizacion}`);
  }
}
