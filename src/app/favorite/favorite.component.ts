import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../product.service';
import { Character } from '../Model/character.model';

@Component({
  selector: 'app-favorite',
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
  styles: [
    `
      .favorites-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background: url('/assets/parchment-texture.png');
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      .favorites-header {
        text-align: center;
        margin-bottom: 2rem;
        padding: 20px 0;
        border-bottom: 2px solid #740001;
        position: relative;
      }

      .favorites-header::before,
      .favorites-header::after {
        content: '⚡';
        position: absolute;
        font-size: 1.5rem;
        color: #d4af37;
      }

      .favorites-header::before {
        left: 20%;
      }

      .favorites-header::after {
        right: 20%;
      }

      h2 {
        font-family: 'Harry Potter', 'Playfair Display', serif;
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        color: #2a623d; /* Slytherin green */
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      }

      .favorites-count {
        font-size: 1.1rem;
        color: #740001; /* Gryffindor red */
        font-family: 'Crimson Text', serif;
      }

      .characters-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 30px;
        padding: 30px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 8px;
      }

      .no-favorites {
        text-align: center;
        padding: 3rem;
        background: rgba(248, 245, 230, 0.9);
        border: 2px solid #d4af37; /* Golden border */
        border-radius: 12px;
        margin: 2rem auto;
        max-width: 600px;
        position: relative;
      }

      .no-favorites::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('/assets/hogwarts-watermark.png') center no-repeat;
        opacity: 0.1;
        pointer-events: none;
      }

      .no-favorites p {
        margin: 0.8rem 0;
        color: #2a623d;
        font-family: 'Crimson Text', serif;
      }

      .no-favorites p:first-child {
        font-size: 1.4rem;
        color: #740001;
        font-weight: bold;
        font-family: 'Harry Potter', 'Playfair Display', serif;
      }

      @media (max-width: 768px) {
        .characters-grid {
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          padding: 15px;
        }

        .favorites-header::before,
        .favorites-header::after {
          display: none;
        }
      }
    `,
  ],
})
export class FavoritesComponent implements OnInit {
  favorites: Character[] = [];
  favoriteCount: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadFavorites();
    this.productService.getFavoritesCount().subscribe((count) => {
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
