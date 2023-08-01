import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CatalogoEspochService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/catalogo-espoch/guardar-catalogo-espoch`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/catalogo-espoch/guardar-catalogo-espoch`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/catalogo-espoch/obtener-catalogo-espoch/${id}`);
  }

  public listar(){
    return this.http.get(`${baserUrl}/catalogo-espoch/listar-catalogo-espoch`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/catalogo-espoch/eliminar-catalogo-espoch/${id}`); 
  }

  public comprobarArchivo(modelo:any){
    return this.http.post(`${baserUrl}/catalogo-espoch/comprobar-archivo`,modelo);
  }
  
  public importarArchivo(modelo:any){
    return this.http.post(`${baserUrl}/catalogo-espoch/importar-archivo`,modelo);
  }
}