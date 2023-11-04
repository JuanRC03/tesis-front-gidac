import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTipoProyecto'
})
export class FiltroTipoProyectoPipe implements PipeTransform {

  
  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.nombreTipoProyecto.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }


}
