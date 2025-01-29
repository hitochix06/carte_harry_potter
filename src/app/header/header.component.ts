import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FontAwesomeModule],
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
          <a
            routerLink="/cart"
            routerLinkActive="active"
            class="nav-link cart-link"
          >
            <fa-icon [icon]="cartIcon"></fa-icon>
            <span *ngIf="cartItemCount > 0" class="cart-badge">
              {{ cartItemCount }}
            </span>
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        background: #1a472a; /* Vert Serpentard comme base */
        background-image: linear-gradient(
            to right,
            rgba(26, 71, 42, 0.95),
            /* Vert Serpentard */ rgba(116, 0, 1, 0.95),
            /* Rouge Gryffondor */ rgba(148, 107, 45, 0.95)
              /* Bronze Serdaigle */
          ),
          url('/assets/parchment-texture.png'); /* Ajoutez une texture de parchemin */
        color: #ffd700;
        padding: 1.5rem 0;
        border-bottom: 3px solid #d3a625;
        position: relative;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }

      .header::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
        height: 5px;
        background: repeating-linear-gradient(
          45deg,
          #740001,
          #740001 10px,
          #d3a625 10px,
          #d3a625 20px
        );
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

      .logo h1 {
        font-family: 'Playfair Display', serif;
        font-size: 2rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 1px;
        background: linear-gradient(to right, #ffd700, #d3a625);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .navigation {
        display: flex;
        gap: 2rem;
      }

      .nav-link {
        color: #d3a625;
        text-decoration: none;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        border: 1px solid transparent;
      }

      .nav-link:hover {
        color: #ffd700;
        background: rgba(211, 166, 37, 0.1);
        border: 1px solid #d3a625;
        transform: translateY(-2px);
      }

      .nav-link.active {
        color: #ffd700;
        font-weight: bold;
        background: rgba(211, 166, 37, 0.2);
        border: 1px solid #d3a625;
        box-shadow: 0 0 10px rgba(211, 166, 37, 0.3);
      }

      .favorite-count {
        font-size: 0.9rem;
        background: #d3a625;
        color: #1a472a;
        padding: 0.2rem 0.5rem;
        border-radius: 12px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

      .cart-link {
        position: relative;
        margin-left: 10px;
      }

      .cart-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #d3a625;
        color: #1a472a;
        border: 2px solid #ffd700;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 0.8rem;
        font-weight: bold;
        min-width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px rgba(211, 166, 37, 0.5);
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
          background: rgba(26, 71, 42, 0.98);
          backdrop-filter: blur(10px);
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
          border-bottom: 1px solid rgba(211, 166, 37, 0.3);
          border-radius: 0;
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

        .cart-badge {
          top: 10px;
          right: -15px;
        }

        .hamburger,
        .hamburger::before,
        .hamburger::after {
          background: #d3a625;
          box-shadow: 0 0 5px rgba(211, 166, 37, 0.5);
        }
      }

      fa-icon {
        margin-right: 0.5rem;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  favoriteCount: number = 0;
  isMenuOpen: boolean = false;
  cartItemCount: number = 0;
  cartIcon = faShoppingCart;

  constructor(private productService: ProductService) {
    this.productService.getFavoritesCount().subscribe((count) => {
      this.favoriteCount = count;
    });
  }

  ngOnInit() {
    this.productService.getCartItemCount().subscribe((count) => {
      this.cartItemCount = count;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
