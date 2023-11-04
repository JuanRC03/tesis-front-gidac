import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArea'
})
export class FiltroAreaPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.area==search
                                   || ar.unidadMedida.abreviatura.toUpperCase().includes( search.toUpperCase())
                                   || ar.unidadMedida.unidadMedida.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
