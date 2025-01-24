import { Pipe, PipeTransform } from '@angular/core';
import { Character } from './Model/character.model';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(characters: Character[], searchTerm: string): Character[] {
    if (!characters || !searchTerm) {
      return characters;
    }

    searchTerm = searchTerm.toLowerCase();
    return characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm)
    );
  }
}
