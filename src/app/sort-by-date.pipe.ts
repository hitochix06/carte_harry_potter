import { Pipe, PipeTransform } from '@angular/core';
import { Character } from './Model/character.model';

@Pipe({
  name: 'sortByDate',
  standalone: true
})
export class SortByDatePipe implements PipeTransform {
  transform(character: Character, ascending: boolean = true): Character {
    return character;
  }
}
