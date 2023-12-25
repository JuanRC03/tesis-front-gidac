import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProyectoEstadoAdminDatos'
})
export class FiltroProyectoEstadoAdminDatosPipe implements PipeTransform {

  transform(array: any[],search: string,searchEstado: string ): any {
    
    const datos = array.filter( ar =>(ar.estadoProyectoInvestigacion.nombreEstadoProyecto.includes(searchEstado))
    && (ar.nombreProyecto.toUpperCase().includes( search.toUpperCase()) || ar.descripcion.toUpperCase().includes( search.toUpperCase()))
    );
   
    return datos;
  }
}
