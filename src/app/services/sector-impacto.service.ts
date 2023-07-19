import { Injectable } from '@angular/core';
import baserUrl from './helper';
  import { HttpClient } from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class SectorImpactoService {


  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/sector-impacto/guardar`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/sector-impacto/actualizar`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/sector-impacto/obtener/${id}`);
  }

  public listarVigentes(){
    return this.http.get(`${baserUrl}/sector-impacto/listar-vigentes`);
  }

  public listarEliminados(){
    return this.http.get(`${baserUrl}/sector-impacto/listar-eliminados`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/sector-impacto/eliminar/${id}`); 
  }

  public restablecer(id:any){
    return this.http.get(`${baserUrl}/sector-impacto/restablecer/${id}`);
  }
}
