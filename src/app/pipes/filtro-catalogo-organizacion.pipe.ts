import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCatalogoOrganizacion'
})
export class FiltroCatalogoOrganizacionPipe implements PipeTransform {

  transform(array: any[],search: string): any {
    if ( search.length === 0 ){return array}

    const datos = array.filter( ar => ar.nombreVariableOrganizacion.toUpperCase().includes( search.toUpperCase()) || ar.nombreOrganizacion.toUpperCase().includes( search.toUpperCase())
     
    );
   
    return datos;
  }

}