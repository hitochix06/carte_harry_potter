import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from './Model/character.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private characters: Character[] = [
    {
      id: 0,
      house: 'Gryffondor',
      name: 'Harry Potter',
      image: '/assets/images/harrypotter.jpg',
      isFavorite: false,
      createdDate: new Date(1980, 6, 31),
    },
    {
      id: 1,
      house: 'Gryffondor',
      name: 'Ronnald Weasley',
      image: '/assets/images/Ron_Weasley.jpg',
      isFavorite: false,
      createdDate: new Date(1980, 3, 1),
    },
    {
      id: 2,
      house: 'Gryffondor',
      name: 'Hermione Granger',
      image: './assets/images/Hermione_Granger.jpg',
      isFavorite: false,
      createdDate: new Date(1979, 8, 19),
    },
    {
      id: 3,
      house: 'Gryffondor',
      name: 'Neville Londubas',
      image: './assets/images/Neville_Londubas.jpg',
      isFavorite: false,
      createdDate: new Date(1980, 7, 30),
    },
    {
      id: 4,
      house: 'Gryffondor',
      name: 'Albus Dumbledore',
      image: './assets/images/Albus_Dumbledore.jpg',
      isFavorite: false,
      createdDate: new Date(1881, 7, 30),
    },
    {
      id: 5,
      house: 'Serpentard',
      name: 'Severus Snape',
      image: './assets/images/Severus_Snape.jpg',
      isFavorite: false,
      createdDate: new Date(1960, 1, 9),
    },
    {
      id: 6,
      house: 'Serpentard',
      name: 'Draco Malfoy',
      image: './assets/images/Draco_Malfoy.jpg',
      isFavorite: false,
      createdDate: new Date(1980, 5, 5),
    },
    {
      id: 7,
      house: 'Serdaigle',
      name: 'Luna Lovegood',
      image: './assets/images/Luna_Lovegood.jpg',
      isFavorite: false,
      createdDate: new Date(1981, 2, 13),
    },
    {
      id: 8,
      house: 'Gryffondor',
      name: 'Ginny Weasley',
      image: './assets/images/Ginny_Weasley.jpg',
      isFavorite: false,
      createdDate: new Date(1981, 7, 11),
    },
    {
      id: 9,
      house: 'Gryffondor',
      name: 'Fred Weasley',
      image: './assets/images/Fred_Weasley.jpg',
      isFavorite: false,
      createdDate: new Date(1978, 3, 1),
    },
    {
      id: 10,
      house: 'Gryffondor',
      name: 'George Weasley',
      image: './assets/images/George_Weasley.jpg',
      isFavorite: false,
      createdDate: new Date(1978, 3, 1),
    },
    {
      id: 11,
      house: 'Gryffondor',
      name: 'Minerva McGonagall',
      image: './assets/images/Minerva_McGonagall.jpg',
      isFavorite: false,
      createdDate: new Date(1935, 9, 4),
    },
    {
      id: 12,
      house: 'Gryffondor',
      name: 'Hagrid',
      image: './assets/images/Hagrid.jpg',
      isFavorite: false,
      createdDate: new Date(1928, 11, 6),
    },
    {
      id: 13,
      house: 'Gryffondor',
      name: 'Sirius Black',
      image: './assets/images/Sirius_Black.jpg',
      isFavorite: false,
      createdDate: new Date(1960, 10, 11),
    },
    {
      id: 14,
      house: 'Gryffondor',
      name: 'Remus Lupin',
      image: './assets/images/Remus_Lupin.jpg',
      isFavorite: false,
      createdDate: new Date(1960, 2, 10),
    },
    {
      id: 15,
      house: 'Poufsouffle',
      name: 'Cedric Diggory',
      image: './assets/images/Cedric_Diggory.jpg',
      isFavorite: false,
      createdDate: new Date(1977, 9, 1),
    },
    {
      id: 16,
      house: 'Poufsouffle',
      name: 'Nymphadora Tonks',
      image: './assets/images/Nymphadora_Tonks.jpg',
      isFavorite: false,
      createdDate: new Date(1973, 1, 1),
    },
    {
      id: 17,
      house: 'Serdaigle',
      name: 'Cho Chang',
      image: './assets/images/Cho_Chang.jpg',
      isFavorite: false,
      createdDate: new Date(1979, 8, 1),
    },
    {
      id: 18,
      house: 'Serpentard',
      name: 'Bellatrix Lestrange',
      image: './assets/images/Bellatrix_Lestrange.jpg',
      isFavorite: false,
      createdDate: new Date(1951, 1, 1),
    }
  ];

  private charactersSubject = new BehaviorSubject<Character[]>(this.characters);
  private favoritesCountSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.updateFavoritesCount();
  }

  // Obtenir tous les personnages
  getProducts(): Character[] {
    return this.characters;
  }

  // Observable pour les personnages
  getProductsObservable(): Observable<Character[]> {
    return this.charactersSubject.asObservable();
  }

  // Obtenir un personnage par ID
  getProduct(id: number): Character | undefined {
    return this.characters.find(char => char.id === id);
  }

  // Basculer l'état favori d'un personnage
  toggleFavorite(character: Character): void {
    character.isFavorite = !character.isFavorite;
    this.updateFavoritesCount();
    this.charactersSubject.next(this.characters);
  }

  // Obtenir le nombre de favoris
  getFavoritesCount(): Observable<number> {
    return this.favoritesCountSubject.asObservable();
  }

  // Obtenir uniquement les personnages favoris
  getFavorites(): Character[] {
    return this.characters.filter(char => char.isFavorite);
  }

  // Mettre à jour le compteur de favoris
  private updateFavoritesCount(): void {
    const count = this.characters.filter(char => char.isFavorite).length;
    this.favoritesCountSubject.next(count);
  }

  // Rechercher des personnages
  searchCharacters(term: string): Character[] {
    if (!term.trim()) {
      return this.characters;
    }

    term = term.toLowerCase();
    return this.characters.filter(char =>
      char.name.toLowerCase().includes(term) ||
      char.house.toLowerCase().includes(term)
    );
  }

  // Trier les personnages
  sortCharacters(characters: Character[], sortType: 'name' | 'date', ascending: boolean): Character[] {
    return [...characters].sort((a, b) => {
      if (sortType === 'name') {
        return ascending
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        const comparison = a.createdDate.getTime() - b.createdDate.getTime();
        return ascending ? comparison : -comparison;
      }
    });
  }
}
