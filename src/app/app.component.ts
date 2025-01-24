import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductService } from './product.service';
import { Character } from './Model/character.model';
import { SearchPipe } from './search.pipe';
import { SortByDatePipe } from './sort-by-date.pipe';
import { SortByNamePipe } from './sort-by-name.pipe';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>

    <main class="main-content">
      <div class="container">
        <div class="search-sort-container">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            placeholder="Rechercher un personnage..."
            class="search-input"
          >

          <div class="sort-controls">
            <select [(ngModel)]="sortType" class="sort-select">
              <option value="name">Trier par nom</option>
              <option value="date">Trier par date</option>
            </select>

            <button (click)="toggleSortDirection()" class="sort-direction-btn">
              <i [class]="sortAscending ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
            </button>
          </div>
        </div>

        <div class="characters-grid">
          <app-product-card
            *ngFor="let character of getSortedCharacters()"
            [character]="character"
            (favoriteChange)="onFavoriteChange($event)"
          ></app-product-card>
        </div>
      </div>
    </main>

    <app-footer></app-footer>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 200px);
      background-color: #f5f5f5;
    }

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
      gap: 20px;
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .search-input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }

    .sort-controls {
      display: flex;
      gap: 10px;
    }

    .sort-select {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
    }

    .sort-direction-btn {
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background: white;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .sort-direction-btn:hover {
      background-color: #f0f0f0;
    }

    .characters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }
  `]
})
export class AppComponent implements OnInit {
  characters: Character[] = [];
  searchTerm: string = '';
  sortType: 'name' | 'date' = 'name';
  sortAscending: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.characters = this.productService.getProducts();
  }

  toggleSortDirection() {
    this.sortAscending = !this.sortAscending;
  }

  getSortedCharacters(): Character[] {
    return this.productService.sortCharacters(
      this.productService.searchCharacters(this.searchTerm),
      this.sortType,
      this.sortAscending
    );
  }

  onFavoriteChange(character: Character) {
    this.productService.toggleFavorite(character);
  }
}
