import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../product.service';
import { Character } from '../Model/character.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="favorites-container">
      <div class="favorites-header">
        <h2>Mes Cartes Favorites</h2>
        <p class="favorites-count">{{ favoriteCount }} carte(s) en favori</p>
      </div>

      <div class="characters-grid">
        <app-product-card
          *ngFor="let character of favorites"
          [character]="character"
          (favoriteChange)="onFavoriteChange($event)"
        ></app-product-card>
      </div>

      <div *ngIf="favorites.length === 0" class="no-favorites">
        <p>Vous n'avez pas encore de cartes favorites.</p>
        <p>Cliquez sur le cœur d'une carte pour l'ajouter à vos favoris !</p>
      </div>
    </div>
  `,
  styles: [`
    .favorites-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .favorites-header {
      text-align: center;
      margin-bottom: 2rem;
      color: #740001;
    }

    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .favorites-count {
      font-size: 1.1rem;
      color: #666;
    }

    .characters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .no-favorites {
      text-align: center;
      padding: 3rem;
      background: #f8f5e6;
      border-radius: 8px;
      margin: 2rem auto;
      max-width: 600px;
    }

    .no-favorites p {
      margin: 0.5rem 0;
      color: #666;
    }

    .no-favorites p:first-child {
      font-size: 1.2rem;
      color: #740001;
      font-weight: bold;
    }
  `]
})
export class FavoritesComponent implements OnInit {
  favorites: Character[] = [];
  favoriteCount: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadFavorites();
    this.productService.getFavoritesCount().subscribe(count => {
      this.favoriteCount = count;
    });
  }

  loadFavorites() {
    this.favorites = this.productService.getFavorites();
  }

  onFavoriteChange(character: Character) {
    this.productService.toggleFavorite(character);
    this.loadFavorites();
  }
}
