import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <img src="assets/logoministry.png" alt="Logo Harry Potter" class="logo-img">
          <h1>Cartes Harry Potter</h1>
        </div>
        <nav class="navigation">
          <a href="#" class="nav-link">Accueil</a>
          <a href="#" class="nav-link">Favoris</a>
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
    }

    .nav-link:hover {
      color: #ffd700;
    }
  `]
})
export class HeaderComponent {}
