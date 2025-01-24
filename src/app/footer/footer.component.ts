import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>À propos</h3>
          <p>Collection de cartes des personnages de Harry Potter</p>
        </div>
        <div class="footer-section">
          <h3>Contact</h3>
          <p>Email: contact&#64;poudlard.com</p>
        </div>
        <div class="footer-section">
          <h3>Suivez-nous</h3>
          <div class="social-links">
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Instagram</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Cartes Harry Potter. Tous droits réservés.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #1a472a;
      color: #d3a625;
      padding: 2rem 0 1rem;
      margin-top: 3rem;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .footer-section h3 {
      color: #ffd700;
      margin-bottom: 1rem;
      font-family: 'Playfair Display', serif;
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .social-link {
      color: #d3a625;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .social-link:hover {
      color: #ffd700;
    }

    .footer-bottom {
      text-align: center;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(211, 166, 37, 0.2);
    }

    .footer-bottom p {
      margin: 0;
      font-size: 0.9rem;
    }
  `]
})
export class FooterComponent {}
