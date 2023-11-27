import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroDatoRecolectado'
})
export class FiltroDatoRecolectadoPipe implements PipeTransform {

  transform(array: any[],search: string, searchEstado: string): any {

    if ( searchEstado.length === 0 && search.length === 0){return array}

    if ( searchEstado.length != 0 && search.length != 0){  
          const datos = array.filter( ar => (ar.dataset.codigoDataset===searchEstado)
          && (ar.variableUnidadMedida.variable.tipoVariable.nombreTipoVariable.toUpperCase().includes( search.toUpperCase())
          || ar.variableUnidadMedida.variable.nombreVariable.toUpperCase().includes( search.toUpperCase())
          || ar.valor == search
          || ar.variableUnidadMedida.unidadMedida.abreviatura.toUpperCase().includes( search.toUpperCase())
          || ar.variableUnidadMedida.unidadMedida.unidadMedida.toUpperCase().includes( search.toUpperCase())));
      return datos;
    }

    if ( searchEstado.length != 0){  
        const datos = array.filter( ar => (ar.dataset.codigoDataset===searchEstado));
      return datos;
    }
    
    if ( search.length != 0){  
      const datos = array.filter( ar => ar.variableUnidadMedida.variable.tipoVariable.nombreTipoVariable.toUpperCase().includes( search.toUpperCase())
          || ar.variableUnidadMedida.variable.nombreVariable.toUpperCase().includes( search.toUpperCase())
          || ar.valor == search
          || ar.variableUnidadMedida.unidadMedida.abreviatura.toUpperCase().includes( search.toUpperCase())
          || ar.variableUnidadMedida.unidadMedida.unidadMedida.toUpperCase().includes( search.toUpperCase()));
      return datos;
    }

    if ( searchEstado.length === 0 ){return array}

    if ( search.length === 0 ){return array}

  }
}

