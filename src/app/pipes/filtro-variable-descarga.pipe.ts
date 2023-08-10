import { Pipe, PipeTransform } from '@angular/core';
import { Variable } from '../pages/investigador/descargar-datos/descargar-datos.component';


@Pipe({
  name: 'filtroVariableDescarga'
})
export class FiltroVariableDescargaPipe implements PipeTransform {

  transform(items: Variable[], searchText: string): Variable[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    // Realiza el filtrado según tus criterios
    return items.filter((item: Variable) => {
      // Modifica las propiedades según las columnas en las que deseas filtrar
      return (
        item.nombreVariable.toLowerCase().includes(searchText) ||
        item.unidadMedida.toLowerCase().includes(searchText) ||
        item.nombreTipoVariable.toLowerCase().includes(searchText) ||
        item.nombreOrganizacion.toLowerCase().includes(searchText)
      );
    });
  }
}
