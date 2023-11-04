import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTipoInvestigacion'
})
export class FiltroTipoInvestigacionPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.nombreTipoInvestigacion.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
