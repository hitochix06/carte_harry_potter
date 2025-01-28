import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorite/favorite.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductPanierComponent } from './product-panier/product-panier.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products-list', component: ProductSearchComponent },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
  },
  { path: 'favoris', component: FavoritesComponent },
  { path: 'cart', component: ProductPanierComponent },
  { path: '**', redirectTo: '' },
];
