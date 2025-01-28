import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Character } from '../Model/character.model';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../search.pipe';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, SearchPipe],
  template: `
    <div class="container">
      <div class="search-sort-container">
        <input
          type="text"
          [(ngModel)]="searchTerm"
          placeholder="Rechercher un personnage... (Nom, prix, maison,)"
          class="search-input"
        />
      </div>

      <div class="characters-grid">
        <app-product-card
          *ngFor="let character of characters | search : searchTerm"
          [character]="character"
          (favoriteChange)="onFavoriteChange($event)"
        ></app-product-card>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }

      .search-sort-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .search-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
      }

      .characters-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
      }
    `,
  ],
})
export class ProductSearchComponent implements OnInit {
  characters: Character[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.characters = this.productService.getProducts();
  }

  onFavoriteChange(character: Character) {
    this.productService.toggleFavorite(character);
  }
}
