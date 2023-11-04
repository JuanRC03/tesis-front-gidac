import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroAltura'
})
export class FiltroAlturaPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.alturaMinima==search
                                   || ar.alturaMaxima==search
                                   || ar.unidadMedida.abreviatura.toUpperCase().includes( search.toUpperCase())
                                   || ar.unidadMedida.unidadMedida.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }
}
