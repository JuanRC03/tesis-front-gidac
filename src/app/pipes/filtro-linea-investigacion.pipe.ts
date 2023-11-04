import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroLineaInvestigacion'
})
export class FiltroLineaInvestigacionPipe implements PipeTransform {

  
  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.nombreLineaInvestigacion.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }


}
