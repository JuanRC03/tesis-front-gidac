import { Pipe, PipeTransform } from '@angular/core';
import { FamiliaDTO } from '../pages/admin/add-equivalencia-variable/add-equivalencia-variable.component';

@Pipe({
  name: 'filtroAddFamilia'
})
export class FiltroAddFamiliaPipe implements PipeTransform {
  transform(items: FamiliaDTO[], searchText: string): FamiliaDTO[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    // Realiza el filtrado según tus criterios
    return items.filter((item: FamiliaDTO) => {
      // Modifica las propiedades según las columnas en las que deseas filtrar
      return (
        item.descripcionCompleta.toLowerCase().includes(searchText)
      );
    });
  }
}

  
  
