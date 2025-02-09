import { Pipe, PipeTransform } from '@angular/core';
import { Character } from './Model/character.model';

@Pipe({
  name: 'sortByName',
  standalone: true
})
export class SortByNamePipe implements PipeTransform {
  transform(character: Character, ascending: boolean = true): Character {
    return character;
  }
}

