import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../Model/character.model';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
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
        <div class="add-to-cart">
          <label for="quantity-{{ character.id }}">Quantité :</label>
          <input id="quantity-{{ character.id }}" type="number" [(ngModel)]="quantity" min="1" max="100" />
          <button (click)="addToCart()">Ajouter au panier</button>
        </div>
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

    .add-to-cart {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .add-to-cart input {
      width: 50px;
    }
  `]
})

export class ProductCardComponent {
  @Input() character!: Character;
  @Output() favoriteChange = new EventEmitter<Character>();
  quantity: number = 1; // Quantité par défaut

  constructor(private productService: ProductService) {}

  onFavoriteClick() {
    this.favoriteChange.emit(this.character);
  }

  addToCart() {
    if (this.quantity < 1) {
      alert("Veuillez choisir une quantité valide !");
      return;
    }

    this.productService.addToCart(this.character, this.quantity);
    alert(`${this.character.name} a été ajouté au panier avec la quantité de ${this.quantity}.`);
  }
}
