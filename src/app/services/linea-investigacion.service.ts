import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LineaInvestigacionService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/linea-investigacion/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/linea-investigacion/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/linea-investigacion/obtener/${id}`);
  }

  public listarVigentes(){
    return this.http.get(`${baserUrl}/linea-investigacion/listar-vigentes`);
  }

  public listarEliminados(){
    return this.http.get(`${baserUrl}/linea-investigacion/listar-eliminados`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/linea-investigacion/eliminar/${id}`); 
  }
  public restablecer(id:any){
    return this.http.get(`${baserUrl}/linea-investigacion/restablecer/${id}`);
  }
}
