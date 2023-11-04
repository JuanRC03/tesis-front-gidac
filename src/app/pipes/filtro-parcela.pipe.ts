import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroParcela'
})
export class FiltroParcelaPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.codigoParcela.toUpperCase().includes( search.toUpperCase())
                                   || ar.nombreParcela.toUpperCase().includes( search.toUpperCase())
                                   || ar.coordenadaX.toUpperCase().includes( search.toUpperCase())
                                   || ar.coordenadaY.toUpperCase().includes( search.toUpperCase())
                                   || ar.area.area == search
                                   || ar.area.unidadMedida.abreviatura.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
