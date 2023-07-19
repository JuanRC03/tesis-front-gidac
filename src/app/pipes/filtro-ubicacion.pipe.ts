import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUbicacion'
})
export class FiltroUbicacionPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.canton.toUpperCase().includes( search.toUpperCase()) || ar.parroquia.toUpperCase().includes( search.toUpperCase())
    || ar.comunidad.toUpperCase().includes( search.toUpperCase()) || ar.provincia.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
