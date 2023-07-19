import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private http:HttpClient) { }

  public guardar(modelo:any){
    return this.http.post(`${baserUrl}/ubicacion/guardar-ubicacion`,modelo);
  }

  public actualizar(modelo:any){
    return this.http.put(`${baserUrl}/ubicacion/guardar-ubicacion`,modelo);
  }

  public obtener(id:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion/${id}`);
  }

  public listarVigente(){
    return this.http.get(`${baserUrl}/ubicacion/listar-ubicacion-vigente`);
  }

  public listarEliminado(){
    return this.http.get(`${baserUrl}/ubicacion/listar-ubicacion-eliminado`);
  }

  public eliminar(id:any){
    return this.http.delete(`${baserUrl}/ubicacion/eliminar-ubicacion/${id}`); 
  }

  public obtenerPorPais(id:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion/por-pais/${id}`);
  }

  public obtenerPorProvincia(id:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion/por-provincia/${id}`);
  }

  public obtenerPorCanton(id:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion/por-canton/${id}`);
  }

  public obtenerPorParroquia(id:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion/por-parroquia/${id}`);
  }



  public obtenerPaises(){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion-paises`);
  }


  public obtenerProvincias(idPais:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion-provincias/${idPais}`);
  }

  public obtenerCantones(idPais:any, idProv:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion-cantones/${idPais}/${idProv}`);
  }

  public obtenerParroquias(idPais:any, idProv:any, idCanton:any){
    return this.http.get(`${baserUrl}/ubicacion/obtener-ubicacion-parroquias/${idPais}/${idProv}/${idCanton}`);
  }

}
