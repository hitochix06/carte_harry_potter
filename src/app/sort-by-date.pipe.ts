import { Pipe, PipeTransform } from '@angular/core';
import { Character } from './Model/character.model';

@Pipe({
  name: 'sortByDate',
  standalone: true,
})
export class SortByDatePipe implements PipeTransform {
  transform(characters: Character[], ascending: boolean = true): Character[] {
    if (!characters) return [];

    return [...characters].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    });
  }
}
