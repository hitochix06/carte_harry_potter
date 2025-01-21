
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCardComponent } from './product-card/product-card.component';
import { SortByNamePipe } from './sort-by-name.pipe';
import { Character } from './Model/character.model';
import { SortOption } from './Model/SortOption';
import { SortByDate } from './product.pipe';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductCardComponent,
    SortByDate,
    FormsModule,
    SortByNamePipe,
  ],
  template: `

      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <header class="text-center mb-12">
          <h1 class="text-4xl font-bold text-indigo-800 mb-4">{{ title }}</h1>
          <div
            class="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full"
          >
            <span class="text-xl">{{ countFav }}</span>
            <span class="text-xl">{{
              countFav <= 1 ? 'Favori' : 'Favoris'
            }}</span>
          </div>
        </header>

        <!-- Sort Select -->
        <div class="mb-8 flex justify-center">
          <select
            [(ngModel)]="selectedSort"
            class="w-64 px-4 py-2 rounded-lg border-2 border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white shadow-sm"
          >
            @for (option of sortOptions; track option.id) {
            <option [value]="option.id">{{ option.label }}</option>
            }
          </select>
        </div>

        <!-- Products Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          @if (selectedSort === 'date-asc' || selectedSort === 'date-desc') {
          @for (product of products | sortByDate:(selectedSort === 'date-asc');
          track product.id) {
          <app-product-card
            [character]="product"
            (addItemEvent)="switchFav(product)"
          />
          }
        } @if (selectedSort === 'name-asc' || selectedSort === 'name-desc')
          { @for (product of products | sortByName:(selectedSort ===
          'name-asc'); track product.id) {
          <app-product-card
            [character]="product"
            (addItemEvent)="switchFav(product)"
          />
          } }
        </div>
      </div>
      <router-outlet></router-outlet>
    
  `,
})
export class AppComponent {
  title = 'carte_harry_potter';
  countFav = 0;
  selectedSort = 'date-asc';
  @Input({ required: true }) product: Character = {
    id: 0,
    name: '',
    isFavorite: false,
    createdDate: new Date(),
    image: '',
  };
  @Output() addItemEvent = new EventEmitter<number>();

  productService = inject(ProductService);
  products = this.productService.products;

  sortOptions: SortOption[] = [
    { id: 'date-asc', label: 'Date (plus ancien)' },
    { id: 'date-desc', label: 'Date (plus récent)' },
    { id: 'name-asc', label: 'Nom (A-Z)' },
    { id: 'name-desc', label: 'Nom (Z-A)' },
  ];

  switchFav(product: Character) {
    product.isFavorite = !product.isFavorite;
    this.countFav += product.isFavorite ? 1 : -1;
  }
}
