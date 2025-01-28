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
          <img
            src="assets/logoministry.png"
            alt="Logo Harry Potter"
            class="logo-img"
          />
          <h1>Cartes Harry Potter</h1>
        </div>

        <!-- Bouton hamburger -->
        <button class="menu-toggle" (click)="toggleMenu()">
          <span class="hamburger"></span>
        </button>

        <nav class="navigation" [class.active]="isMenuOpen">
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            class="nav-link"
            >Accueil</a
          >
          <a
            routerLink="/products-list"
            routerLinkActive="active"
            class="nav-link"
          >
            Liste des personnages
          </a>
          <a routerLink="/favoris" routerLinkActive="active" class="nav-link">
            Favoris
            <span class="favorite-count" *ngIf="favoriteCount > 0"
              >({{ favoriteCount }})</span
            >
          </a>
          <a routerLink="/cart" routerLinkActive="active" class="nav-link">
            Panier
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        background: linear-gradient(to right, #740001, #ae0001);
        color: #d3a625;
        padding: 1rem 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

      .menu-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
        z-index: 100;
      }

      .hamburger {
        display: block;
        width: 25px;
        height: 3px;
        background: #d3a625;
        position: relative;
        transition: all 0.3s ease-in-out;
      }

      .hamburger::before,
      .hamburger::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 3px;
        background: #d3a625;
        transition: all 0.3s ease-in-out;
      }

      .hamburger::before {
        transform: translateY(-8px);
      }

      .hamburger::after {
        transform: translateY(8px);
      }

      @media screen and (max-width: 768px) {
        .menu-toggle {
          display: block;
        }

        .navigation {
          position: fixed;
          top: 0;
          right: -100%;
          width: 70%;
          height: 100vh;
          background: #740001;
          flex-direction: column;
          padding: 80px 20px;
          transition: right 0.3s ease-in-out;
          z-index: 1000;
        }

        .navigation.active::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: -1;
        }

        .navigation.active {
          right: 0;
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
        }

        .menu-toggle {
          position: relative;
          z-index: 1001;
        }

        .nav-link {
          padding: 15px 0;
          font-size: 1.2rem;
          border-bottom: 1px solid rgba(211, 166, 37, 0.2);
        }

        .nav-link:last-child {
          border-bottom: none;
        }

        .header-content {
          padding: 0 1.5rem;
        }

        .logo h1 {
          font-size: 1.2rem;
        }

        .logo-img {
          height: 40px;
        }

        .menu-toggle.active .hamburger {
          background: transparent;
        }

        .menu-toggle.active .hamburger::before {
          transform: rotate(45deg);
        }

        .menu-toggle.active .hamburger::after {
          transform: rotate(-45deg);
        }
      }
    `,
  ],
})
export class HeaderComponent {
  favoriteCount: number = 0;
  isMenuOpen: boolean = false;

  constructor(private productService: ProductService) {
    this.productService.getFavoritesCount().subscribe((count) => {
      this.favoriteCount = count;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
