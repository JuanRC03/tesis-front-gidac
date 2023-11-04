import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroSectorImpacto'
})
export class FiltroSectorImpactoPipe implements PipeTransform {

 
  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.nombreSectorImpacto.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
