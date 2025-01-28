import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from './Model/character.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private characters: Character[] = [
    {
      id: 0,
      houseColor: 'Gryffondor',
      name: 'Harry Potter',
      image: 'assets/images/harrypotter.jpg',
      isFavorite: false,
      createdAt: new Date(1980, 6, 31),
      price: 19,
    },
    {
      id: 1,
      houseColor: 'Gryffondor',
      name: 'Ronald Weasley',
      image: 'assets/images/Ron_Weasley.jpg',
      isFavorite: false,
      createdAt: new Date(1980, 3, 1),
      price: 18,
    },
    {
      id: 2,
      houseColor: 'Gryffondor',
      name: 'Hermione Granger',
      image:
        'https://static.wikia.nocookie.net/harrypotter/images/3/34/Hermione_Granger.jpg',
      isFavorite: false,
      createdAt: new Date(1979, 8, 19),
      price: 29,
    },
    {
      id: 3,
      houseColor: 'Gryffondor',
      name: 'Neville Londubat',
      image:
        'https://pm1.aminoapps.com/6916/624ccfc8d19111a6e729f7d532aaabd94a3e4c0ar1-1359-2007v2_uhq.jpg',
      isFavorite: false,
      createdAt: new Date(1980, 7, 30),
      price: 27,
    },
    {
      id: 4,
      houseColor: 'Gryffondor',
      name: 'Albus Dumbledore',
      image: 'assets/images/Albus_Dumbledore.jpg',
      isFavorite: false,
      createdAt: new Date(1881, 7, 30),
      price: 26,
    },
    {
      id: 5,
      houseColor: 'Serpentard',
      name: 'Severus Rogue',
      image:
        'https://static.wikia.nocookie.net/harrypotter/images/a/a3/Severus_Snape.jpg',
      isFavorite: false,
      createdAt: new Date(1960, 1, 9),
      price: 35,
    },
    {
      id: 6,
      houseColor: 'Serpentard',
      name: 'Drago Malefoy',
      image: 'assets/images/Draco_Malfoy.jpg',
      isFavorite: false,
      createdAt: new Date(1980, 5, 5),
      price: 34,
    },
    {
      id: 7,
      houseColor: 'Serdaigle',
      name: 'Luna Lovegood',
      image: 'assets/images/Luna_Lovegood.jpg',
      isFavorite: false,
      createdAt: new Date(1981, 2, 13),
      price: 34,
    },
    {
      id: 8,
      houseColor: 'Gryffondor',
      name: 'Ginny Weasley',
      image:
        'https://static.wikia.nocookie.net/harrypotter/images/8/8b/Ginny_Weasley_hbp_promo.jpg',
      isFavorite: false,
      createdAt: new Date(1981, 7, 11),
      price: 22,
    },
    {
      id: 9,
      houseColor: 'Gryffondor',
      name: 'Fred Weasley',
      image: 'assets/images/Fred_Weasley.jpg',
      isFavorite: false,
      createdAt: new Date(1978, 3, 1),
      price: 17,
    },
    {
      id: 10,
      houseColor: 'Gryffondor',
      name: 'George Weasley',
      image: 'assets/images/George_Weasley.jpg',
      isFavorite: false,
      createdAt: new Date(1978, 3, 1),
      price: 35,
    },
    {
      id: 11,
      houseColor: 'Gryffondor',
      name: 'Minerva McGonagall',
      image:
        'https://static.wikia.nocookie.net/harrypotter/images/6/65/ProfessorMcGonagall-HBP.jpg',
      isFavorite: false,
      createdAt: new Date(1935, 9, 4),
      price: 15,
    },
    {
      id: 12,
      houseColor: 'Gryffondor',
      name: 'Rubeus Hagrid',
      image: 'assets/images/Hagrid.jpg',
      isFavorite: false,
      createdAt: new Date(1928, 11, 6),
      price: 35,
    },
    {
      id: 13,
      houseColor: 'Gryffondor',
      name: 'Sirius Black',
      image: 'assets/images/Sirius_Black.jpg',
      isFavorite: false,
      createdAt: new Date(1960, 10, 11),
      price: 25,
    },
    {
      id: 14,
      houseColor: 'Gryffondor',
      name: 'Remus Lupin',
      image: 'assets/images/Remus_Lupin.jpg',
      isFavorite: false,
      createdAt: new Date(1960, 2, 10),
      price: 30,
    },
    {
      id: 15,
      houseColor: 'Poufsouffle',
      name: 'Cedric Diggory',
      image:
        'data:image/jpeg;base64,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',
      isFavorite: false,
      createdAt: new Date(1977, 9, 1),
      price: 20,
    },
    {
      id: 16,
      houseColor: 'Poufsouffle',
      name: 'Nymphadora Tonks',
      image: 'assets/images/NymphadoraTonks.jpg',
      isFavorite: false,
      createdAt: new Date(1973, 1, 1),
      price: 5,
    },
    {
      id: 17,
      houseColor: 'Serdaigle',
      name: 'Cho Chang',
      image:
        'https://static.wikia.nocookie.net/harrypotter/images/e/e1/Cho.jpg',
      isFavorite: false,
      createdAt: new Date(1979, 8, 1),
      price: 12,
    },
    {
      id: 18,
      houseColor: 'Serpentard',
      name: 'Bellatrix Lestrange',
      image:
        'https://static.wikia.nocookie.net/harrypotter/images/1/14/BellatrixLestrange.png',
      isFavorite: false,
      createdAt: new Date(1951, 1, 1),
      price: 20,
    },
  ];
  private charactersSubject = new BehaviorSubject<Character[]>(this.characters);
  private favoritesCountSubject = new BehaviorSubject<number>(0);

  private cartItems: { product: Character, quantity: number }[] = [];


  constructor() {
    this.updateFavoritesCount();

    // Charger les données du panier depuis localStorage au démarrage
    if (this.localStorageAvailable) {
      const storedCart = window.localStorage.getItem('cart');
      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
      }
    }
  }

  private get localStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  private saveCartToLocalStorage() {
    if (this.localStorageAvailable) {
      window.localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }

  // Méthode pour ajouter un produit au panier
  addToCart(product: Character, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.saveCartToLocalStorage();
  }

  // Méthode pour obtenir les éléments du panier
  getCartItems(): { product: Character, quantity: number }[] {
    return this.cartItems;
  }

  // Méthode pour calculer le total du panier
  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  // Méthode pour vider le panier
  clearCart(): void {
    this.cartItems = [];
    this.saveCartToLocalStorage();
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
    return this.characters.find((char) => char.id === id);
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
    return this.characters.filter((char) => char.isFavorite);
  }

  // Mettre à jour le compteur de favoris
  private updateFavoritesCount(): void {
    const count = this.characters.filter((char) => char.isFavorite).length;
    this.favoritesCountSubject.next(count);
  }

  // Rechercher des personnages
  searchCharacters(term: string): Character[] {
    if (!term.trim()) {
      return this.characters;
    }

    term = term.toLowerCase();
    return this.characters.filter(
      (char) =>
        char.name.toLowerCase().includes(term) ||
        char.houseColor.toLowerCase().includes(term)
    );
  }

  // Trier les personnages
  sortCharacters(
    characters: Character[],
    sortType: 'name' | 'date',
    ascending: boolean
  ): Character[] {
    return [...characters].sort((a, b) => {
      if (sortType === 'name') {
        return ascending
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        const comparison = a.createdAt.getTime() - b.createdAt.getTime();
        return ascending ? comparison : -comparison;
      }
    });
  }
}
