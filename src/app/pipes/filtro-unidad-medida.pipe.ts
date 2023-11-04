import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUnidadMedida'
})
export class FiltroUnidadMedidaPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.abreviatura.toUpperCase().includes( search.toUpperCase())
                                   || ar.unidadMedida.toUpperCase().includes( search.toUpperCase())
                                   || ar.magnitud.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }


}
