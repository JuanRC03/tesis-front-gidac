import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  
  public obtenerAlturasMasUsuadas(){
      return this.http.get(`${baserUrl}/dash/obtener-por-altura`);
  }
  public obtenerUnidadesDeMedidaMasUsuadas(){
    return this.http.get(`${baserUrl}/dash/obtener-por-unidad-medida`);
  }
  public obteneProfundidadesMasUsuadas(){
    return this.http.get(`${baserUrl}/dash/obtener-por-profunidad`);
  }
  public obteneValorPromedioVariablesNumericas(){
    return this.http.get(`${baserUrl}/dash/obtener-por-varible-valor-promedio`);
  }
  public obteneCantidadDatosPorVariable(){
    return this.http.get(`${baserUrl}/dash/obtener-por-cantidad-variable`);
  }
  
  //administradior
  public obtenerCantidadProyectosPorAreaInvestigacion(){
    return this.http.get(`${baserUrl}/dash/obtener-por-area-investigadion`);
  }
  public obtenerCantidadProyectosPorSectorImpacto(){
    return this.http.get(`${baserUrl}/dash/obtener-por-sector-impacto`);
  }
  public  obtenerCantidadProyectosPorLineaInvestigacion(){
    return this.http.get(`${baserUrl}/dash/obtener-por-linea-investigacion`);
  }
  public obtenerCantidadProyectosPorTipoProyecto(){
    return this.http.get(`${baserUrl}/dash/obtener-por-tipo-proyecto`);
  }
  public obtenerCantidadProyectosPorTipoInvestigacion(){
    return this.http.get(`${baserUrl}/dash/obtener-por-tipo-investigacion`);
  }
  public obtenerCantidadProyectosPorEstadoProyecto(){
    return this.http.get(`${baserUrl}/dash/obtener-por-estado-proyecto`);
  }
  public obtenerCantidadProyectosPorDirector(){
    return this.http.get(`${baserUrl}/dash/obtener-por-director`);
  }

  //director
  public obtenerEstadoProyecto(id:any){
    return this.http.get(`${baserUrl}/dash/obtener-estado-proyectos/${id}`);
  }

  
  public obtenerSolicitudesDescarga(id:any){
    return this.http.get(`${baserUrl}/dash/obtener-solicitudes-descarga/${id}`);
  }

  public obtenerSolicitudesActualizar(id:any){
    return this.http.get(`${baserUrl}/dash/obtener-solicitudes-actualizar/${id}`);
  }

  public obtenerSolicitudesDescargaGraficaPorAnio(id:any){
    return this.http.get(`${baserUrl}/dash/obtener-grafica-solicitudes-por-anio/${id}`);
  }

  public obtenerSolicitudesDescargaGraficaPorMes(id:any){
    return this.http.get(`${baserUrl}/dash/obtener-grafica-solicitudes-por-mes/${id}`);
  }

  public obtenerSolicitudesDescargaGraficaPorDia(id:any){
    return this.http.get(`${baserUrl}/dash/obtener-grafica-solicitudes-por-dia/${id}`);
  }

  public obtenerSolicitudesDescargaGraficaActualizarPorAnio(id:any){
    return this.http.get(`${baserUrl}/dash/obtener-grafica-solicitudes-actualizar-por-anio/${id}`);
  }

  public obtenerSolicitudesDescargaGraficaActualizarPorMes(id:any){
    return this.http.get(`${baserUrl}/dash/obtener-grafica-solicitudes-actualizar-por-mes/${id}`);
  }

  public obtenerSolicitudesDescargaGraficaActualizarPorDia(id:any){
    return this.http.get(`${baserUrl}/dash/obtener-grafica-solicitudes-actualizar-por-dia/${id}`);
  }


  public obtenerAccesoPorAnio(){
    return this.http.get(`${baserUrl}/dash/obtener-grafica-acceso-por-anio`);
  }

  public obtenerAccesoPorMes(){
    return this.http.get(`${baserUrl}/dash/obtener-grafica-acceso-por-mes`);
  }

  public obtenerAccesoPorDia(){
    return this.http.get(`${baserUrl}/dash/obtener-grafica-acceso-por-dia`);
  }

  public obtenerUsuarioPorRol(){
    return this.http.get(`${baserUrl}/dash/obtener-grafica-usuario-por-rol`);
  }

  public obtenerSolicitudesActualizarInvestigador(id:any){
    return this.http.get(`${baserUrl}/dash/obtener-solictudes-actualizar-investigador/${id}`);
  }

}
