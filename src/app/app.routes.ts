import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorite/favorite.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products-list', component: ProductSearchComponent },
  { path: 'favoris', component: FavoritesComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '' },
];
