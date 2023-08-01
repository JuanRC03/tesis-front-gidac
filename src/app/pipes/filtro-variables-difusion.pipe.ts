import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroVariablesDifusion'
})
export class FiltroVariablesDifusionPipe implements PipeTransform {

  transform(array: any[],search: string,searchOrganizacion: string ): any {
    
    const datos = array.filter( ar =>(ar.nombreOrganizacion.includes(searchOrganizacion))
    && (ar.nombreVariable.toUpperCase().includes( search.toUpperCase()))
    );
   
    return datos;
  }

}
