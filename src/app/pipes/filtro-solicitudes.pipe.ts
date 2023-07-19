import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroSolicitudes'
})
export class FiltroSolicitudesPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.nombre.toUpperCase().includes( search.toUpperCase()) || ar.apellido.toUpperCase().includes( search.toUpperCase())
    || ar.emial.toUpperCase().includes( search.toUpperCase()) || ar.institucion.toUpperCase().includes( search.toUpperCase())
    || ar.investigacion.nombreInvestigacion.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
