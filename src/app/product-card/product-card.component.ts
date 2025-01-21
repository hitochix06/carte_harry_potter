import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Character } from '../Model/character.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
     <div class="bg-white rounded-lg shadow-md p-4 m-2 hover:shadow-lg transition-shadow">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-xl font-bold text-gray-800">{{ character.name }}</h1>
          <img [src]="character.image"
               [alt]="character.name"
               class="w-32 h-32 object-cover rounded-lg mt-2"
               (error)="onImageError($event)">
          <p class="text-sm text-gray-600">Créé le: {{ character.createdDate | date: 'dd/MM/yyyy' }}</p>
        </div>
        <button
          class="favorite-btn group relative"
          (click)="switchFav()"
          [class.active]="character.isFavorite">
          <span class="sr-only">Ajouter aux favoris</span>
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-6 w-6 transition-all duration-300 ease-in-out"
               [class.text-yellow-400]="character.isFavorite"
               [class.text-gray-400]="!character.isFavorite"
               fill="currentColor"
               viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          <span class="tooltip">{{ character.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris' }}</span>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .favorite-btn {
      padding: 8px;
      border-radius: 50%;
      transition: all 0.3s ease;
      position: relative;
    }

    .favorite-btn:hover {
      transform: scale(1.1);
      background-color: rgba(0, 0, 0, 0.05);
    }

    .favorite-btn.active:hover {
      background-color: rgba(251, 191, 36, 0.1);
    }

    .tooltip {
      visibility: hidden;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 5px 10px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .favorite-btn:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }
    `,
  ],
})
export class ProductCardComponent {
  @Input({ required: true }) character: Character = {
    id: 0,
    name: '',
    isFavorite: false,
    createdDate: new Date(),
    image: '',
  };
  @Output() addItemEvent = new EventEmitter<Character>();

  switchFav() {
    this.addItemEvent.emit(this.character);
  }

  onImageError(event: any) {
    console.error('Erreur de chargement image:', event.target.src);
    event.target.src = '/assets/images/default.jpg';
  }

}
