import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCanton'
})
export class FiltroCantonPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}
    const datos = array.filter( ar => ar.codigoCanton.toUpperCase().includes( search.toUpperCase()) ||
                                      ar.nombreCanton.toUpperCase().includes( search.toUpperCase()) );
    return datos;
  }
}
