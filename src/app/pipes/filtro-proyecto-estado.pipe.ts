import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProyectoEstado'
})
export class FiltroProyectoEstadoPipe implements PipeTransform {

  transform(array: any[],search: string,searchEstado: string ): any {
    
    const datos = array.filter( ar =>(ar.proyectoInvestigacion.estadoProyectoInvestigacion.nombreEstadoProyecto.includes(searchEstado))
    && (ar.proyectoInvestigacion.nombreProyecto.toUpperCase().includes( search.toUpperCase()) || ar.proyectoInvestigacion.descripcion.toUpperCase().includes( search.toUpperCase()))
    );
   
    return datos;
  }

}
