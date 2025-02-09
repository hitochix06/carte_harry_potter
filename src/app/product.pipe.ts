import { Pipe, PipeTransform } from '@angular/core';
import { Character } from './Model/character.model';
@Pipe({
  name: 'sortByDate',
})
export class SortByDate implements PipeTransform {
  transform(products: Character[], asc?: boolean) {
    return products.sort((a, b) => {
      return asc
        ? a.createdDate.getTime() - b.createdDate.getTime()
        : b.createdDate.getTime() - a.createdDate.getTime();
    });
  }
}
