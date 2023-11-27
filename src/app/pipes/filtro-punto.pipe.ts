import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPunto'
})
export class FiltroPuntoPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}
    const datos = array.filter( ar => ar.profundidad.profundidadMinima == search
                                   || ar.profundidad.profundidadMaxima == search
                                   || ar.profundidad.unidadMedida.abreviatura.toUpperCase().includes( search.toUpperCase()));
    return datos;
  }
}
