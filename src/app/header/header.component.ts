import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <img src="assets/logoministry.png" alt="Logo Harry Potter" class="logo-img">
          <h1>Cartes Harry Potter</h1>
        </div>
        <nav class="navigation">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Accueil</a>
          <a routerLink="/favoris" routerLinkActive="active" class="nav-link">
            Favoris
            <span class="favorite-count" *ngIf="favoriteCount > 0">({{ favoriteCount }})</span>
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(to right, #740001, #ae0001);
      color: #d3a625;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-img {
      height: 50px;
      width: auto;
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      margin: 0;
    }

    .navigation {
      display: flex;
      gap: 2rem;
    }

    .nav-link {
      color: #d3a625;
      text-decoration: none;
      font-size: 1.1rem;
      transition: color 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-link:hover {
      color: #ffd700;
    }

    .nav-link.active {
      color: #ffd700;
      font-weight: bold;
    }

    .favorite-count {
      font-size: 0.9rem;
      background: #ffd700;
      color: #740001;
      padding: 0.2rem 0.5rem;
      border-radius: 12px;
      font-weight: bold;
    }
  `]
})
export class HeaderComponent {
  favoriteCount: number = 0;

  constructor(private productService: ProductService) {
    this.productService.getFavoritesCount().subscribe(count => {
      this.favoriteCount = count;
    });
  }
}
