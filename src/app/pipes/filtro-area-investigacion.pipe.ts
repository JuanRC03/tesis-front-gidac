import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroAreaInvestigacion'
})
export class FiltroAreaInvestigacionPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.nombreAreaInvestigacion.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
