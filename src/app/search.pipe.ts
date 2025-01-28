import { Pipe, PipeTransform } from '@angular/core';
import { Character } from './Model/character.model';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(characters: Character[], searchTerm: string): Character[] {
    if (!characters || !searchTerm) {
      return characters;
    }

    searchTerm = searchTerm.toLowerCase().trim();

    return characters.filter((character) => {
      const dateStr = character.createdDate.toLocaleDateString();

      return (
        character.name.toLowerCase().includes(searchTerm) ||
        character.houseColor.toLowerCase().includes(searchTerm) ||
        character.price.toString().includes(searchTerm) ||
        dateStr.includes(searchTerm)
      );
    });
  }

  private matchesSearch(character: Character, term: string): boolean {
    return (
      character.name.toLowerCase().includes(term) ||
      character.houseColor.toLowerCase().includes(term) ||
      character.price.toString().includes(term)
    );
  }
}
