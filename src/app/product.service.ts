import { Injectable } from '@angular/core';
import { Character } from './Model/character.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  products = [
    <Character>{id: 0,
      name: 'Harry Potter',
      image: '/assets/images/harrypotter.jpg',
      isFavorite: false,
      createdDate: new Date(1980, 6, 31),
    },
    <Character>{id: 1,
      name: 'Ronnald Weasley',
      image: '/assets/images/Ron_Weasley.jpg',
      isFavorite: false,
      createdDate: new Date(1980, 3, 1),
    },
    <Character>{id: 2,
      name: 'Hermione Granger',
      image: './assets/images/Hermione_Granger.jpg',
      isFavorite: false,
      createdDate: new Date(1979, 8, 19),
    },
    <Character>{id: 3,
      name: 'Neville Londubas',
      image: './assets/images/neville.jpg',
      isFavorite: false,
      createdDate: new Date(1980, 7, 30),
    },
    <Character>{id: 4,
      name: 'Albus Dumbledore',
      image: './assets/images/dumbledore.jpg',
      isFavorite: false,
      createdDate: new Date(1881, 7, 30),
    },
    <Character>{id: 5,
      name: 'Severus Snape',
      image: './assets/images/snape.jpg',
      isFavorite: false,
      createdDate: new Date(1960, 1, 9),
    },
    <Character>{id: 6,
      name: 'Draco Malfoy',
      image: './assets/images/draco.jpg',
      isFavorite: false,
      createdDate: new Date(1980, 5, 5),
    },
    <Character>{id: 7,
      name: 'Luna Lovegood',
      image: './assets/images/luna.jpg',
      isFavorite: false,
      createdDate: new Date(1981, 2, 13),
    },
    <Character>{id: 8,
      name: 'Ginny Weasley',
      image: './assets/images/ginny.jpg',
      isFavorite: false,
      createdDate: new Date(1981, 7, 11),
    },
    <Character>{id: 9,
      name: 'Fred Weasley',
      image: './assets/images/fred.jpg',
      isFavorite: false,
      createdDate: new Date(1978, 3, 1),
    },
    <Character>{id: 10,
      name: 'George Weasley',
      image: './assets/images/george.jpg',
      isFavorite: false,
      createdDate: new Date(1978, 3, 1),
    },
    <Character>{id: 11,
      name: 'Minerva McGonagall',
      image: './assets/images/mcgonagall.jpg',
      isFavorite: false,
      createdDate: new Date(1935, 9, 4),
    },
    <Character>{id: 12,
      name: 'Hagrid',
      image: './assets/images/hagrid.jpg',
      isFavorite: false,
      createdDate: new Date(1928, 11, 6),
    },
    <Character>{id: 13,
      name: 'Sirius Black',
      image: './assets/images/sirius.jpg',
      isFavorite: false,
      createdDate: new Date(1960, 10, 11),
    },
    <Character>{id: 14,
      name: 'Remus Lupin',
      image: './assets/images/lupin.jpg',
      isFavorite: false,
      createdDate: new Date(1960, 2, 10),
    },
  ];


  getProducts(): Character[] {
    return this.products;
  }

  getProduct(id: number) {
    return this.products[id];
  }

  swithFav(product: Character) {
    product.isFavorite = !product.isFavorite;
  }


  constructor() { }
}
