import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroConglomerados'
})
export class FiltroConglomeradosPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.codigoConglomerado.toUpperCase().includes( search.toUpperCase())
                                   || ar.nombreConglomerado.toUpperCase().includes( search.toUpperCase())
                                   || ar.altura.alturaMinima == search
                                   || ar.altura.alturaMaxima == search
                                   || ar.altura.unidadMedida.abreviatura.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }
}
