import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="magical-border"></div>
      <div class="footer-content">
        <div class="footer-section">
          <h3><i class="fas fa-wand-sparkles"></i> À propos</h3>
          <p>Collection de cartes des personnages de Harry Potter</p>
        </div>
        <div class="footer-section">
          <h3><i class="fas fa-owl"></i> Contact</h3>
          <p>Envoyez-nous un hibou : contact&#64;poudlard.com</p>
        </div>
        <div class="footer-section">
          <h3><i class="fas fa-hat-wizard"></i> Réseaux Magiques</h3>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Cartes Harry Potter. Fait avec de la magie ✨</p>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: linear-gradient(to bottom, #1a1a1a, #2a0f0f);
        color: #e0b684;
        padding: 3rem 0 1rem;
        position: relative;
        font-family: 'Crimson Text', serif;
      }

      .magical-border {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(
          90deg,
          #740001 0%,
          /* Gryffondor */ #1a472a 25%,
          /* Serpentard */ #ecb939 50%,
          /* Poufsouffle */ #0e1a40 75%,
          /* Serdaigle */ #740001 100% /* Retour Gryffondor */
        );
      }

      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 3rem;
      }

      .footer-section h3 {
        color: #ffd700;
        margin-bottom: 1.5rem;
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .footer-section p {
        line-height: 1.6;
        font-size: 1.1rem;
      }

      .social-links {
        display: flex;
        gap: 1.5rem;
      }

      .social-link {
        color: #e0b684;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 1.5rem;
      }

      .social-link:hover {
        color: #ffd700;
        transform: scale(1.2);
        text-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
      }

      .footer-bottom {
        text-align: center;
        margin-top: 3rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(224, 182, 132, 0.2);
        position: relative;
      }

      .deathly-hallows {
        width: 30px;
        height: auto;
        margin-bottom: 1rem;
        opacity: 0.7;
      }

      .footer-bottom p {
        margin: 0;
        font-size: 1rem;
        letter-spacing: 1px;
      }

      @media (max-width: 768px) {
        .footer-content {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .footer-section h3 {
          justify-content: center;
        }

        .social-links {
          justify-content: center;
        }
      }
    `,
  ],
})
export class FooterComponent {}
