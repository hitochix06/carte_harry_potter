import { Injectable } from '@angular/core';
import { Character } from './Model/character.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  products = [
    <Character>{id: 0,
      house: 'Gryffindor',
      name: 'Harry Potter',
      image: '/assets/images/harrypotter.jpg',
      isFavorite: false,
      createdDate: new Date(1980, 6, 31),
    },
    <Character>{id: 1,
      house: 'Gryffindor',
      name: 'Ronnald Weasley',
      image: '/assets/images/Ron_Weasley.jpg',
      isFavorite: false,
      createdDate: new Date(1980, 3, 1),
    },
    <Character>{id: 2,
      house: 'Gryffindor',
      name: 'Hermione Granger',
      image: './assets/images/Hermione_Granger.jpg',
      isFavorite: false,
      createdDate: new Date(1979, 8, 19),
    },
    <Character>{id: 3,
      house: 'Gryffindor',
      name: 'Neville Londubas',
      image: './assets/images/Neville_Londubas.jpg',
      isFavorite: false,
      createdDate: new Date(1980, 7, 30),
    },
    <Character>{id: 4,
      house: 'Gryffindor',
      name: 'Albus Dumbledore',
      image: './assets/images/Albus_Dumbledore.jpg',
      isFavorite: false,
      createdDate: new Date(1881, 7, 30),
    },
    <Character>{id: 5,
      house: 'Slytherin',
      name: 'Severus Snape',
      image: './assets/images/Severus_Snape.jpg',
      isFavorite: false,
      createdDate: new Date(1960, 1, 9),
    },
    <Character>{id: 6,
      house: 'Slytherin',
      name: 'Draco Malfoy',
      image: './assets/images/Draco_Malfoy.jpg',
      isFavorite: false,
      createdDate: new Date(1980, 5, 5),
    },
    <Character>{id: 7,
      house: 'Ravenclaw',
      name: 'Luna Lovegood',
      image: './assets/images/Luna_Lovegood.jpg',
      isFavorite: false,
      createdDate: new Date(1981, 2, 13),
      },

      <Character>{id: 8,
      house: 'Gryffindor',
      name: 'Ginny Weasley',
      image: './assets/images/Ginny_Weasley.jpg',
      isFavorite: false,
      createdDate: new Date(1981, 7, 11),
    },
    <Character>{id: 9,
      house: 'Gryffindor',
      name: 'Fred Weasley',
      image: './assets/images/Fred_Weasley.jpg',
      isFavorite: false,
      createdDate: new Date(1978, 3, 1),
    },
    <Character>{id: 10,
      house: 'Gryffindor',
      name: 'George Weasley',
      image: './assets/images/George_Weasley.jpg',
      isFavorite: false,
      createdDate: new Date(1978, 3, 1),
    },
    <Character>{id: 11,
      house: 'Gryffindor',
      name: 'Minerva McGonagall',
      image: './assets/images/Minerva_McGonagall.jpg',
      isFavorite: false,
      createdDate: new Date(1935, 9, 4),
    },
    <Character>{id: 12,
      house: 'Gryffindor',
      name: 'Hagrid',
      image: './assets/images/Hagrid.jpg',
      isFavorite: false,
      createdDate: new Date(1928, 11, 6),
    },
    <Character>{id: 13,
      house: 'Gryffindor',
      name: 'Sirius Black',
      image: './assets/images/Sirius_Black.jpg',
      isFavorite: false,
      createdDate: new Date(1960, 10, 11),
    },
    <Character>{id: 14,
      house: 'Gryffindor',
      name: 'Remus Lupin',
      image: './assets/images/Remus_Lupin.jpg',
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
