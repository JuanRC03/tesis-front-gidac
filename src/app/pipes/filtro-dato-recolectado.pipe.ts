import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroDatoRecolectado'
})
export class FiltroDatoRecolectadoPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.variableUnidadMedida.variable.tipoVariable.nombreTipoVariable.toUpperCase().includes( search.toUpperCase())
                                   || ar.variableUnidadMedida.variable.nombreVariable.toUpperCase().includes( search.toUpperCase())
                                   || ar.valor == search
                                   || ar.variableUnidadMedida.unidadMedida.abreviatura.toUpperCase().includes( search.toUpperCase())
                                   || ar.variableUnidadMedida.unidadMedida.unidadMedida.toUpperCase().includes( search.toUpperCase()));
   
    return datos;
  }

}
