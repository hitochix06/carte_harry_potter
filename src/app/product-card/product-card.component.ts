import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../Model/character.model';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <img [src]="character.image" [alt]="character.name" class="card-image">
      <div class="card-content">
        <h3>{{ character.name }}</h3>
        <p>Maison : {{ character.house }}</p>
        <p>Date : {{ character.createdDate | date:'dd/MM/yyyy' }}</p>
        <p>Prix : {{ character.price | currency:'EUR' }}</p>
        <button (click)="onFavoriteClick()">
          <i [class]="character.isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .card-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .card-content {
      padding: 1rem;
    }
  `]
})



export class ProductCardComponent {
  @Input() character!: Character;
  @Output() favoriteChange = new EventEmitter<Character>();

  onFavoriteClick() {
    this.favoriteChange.emit(this.character);
  }
}
