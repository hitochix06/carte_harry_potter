import { Pipe, PipeTransform } from '@angular/core';
import { Character } from './Model/character.model';

@Pipe({
  name: 'sortByName'
})
export class SortByNamePipe implements PipeTransform {

  transform(products: Character[], ascending: boolean = true): Character[] {
    return [...products].sort((a, b) => {
      return ascending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }

}

