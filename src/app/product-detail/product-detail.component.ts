import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../Model/character.model';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  template: `
    <div class="detail-container" *ngIf="character">
      <app-notification></app-notification>
      <button class="back-button" (click)="goBack()">
        <i class="fas fa-arrow-left"></i> Retour
      </button>

      <div class="detail-content">
        <div class="left-section">
          <img
            [src]="character.image"
            [alt]="character.name"
            class="character-image"
          />
          <div class="price">
            {{ character.price | currency : 'EUR' : 'symbol' : '1.2-2' }}
          </div>
        </div>

        <div class="right-section">
          <h1>{{ character.name }}</h1>
          <div
            class="house-badge"
            [ngClass]="character.houseColor.toLowerCase()"
          >
            {{ character.houseColor }}
          </div>

          <div class="character-info">
            <div class="character-details">
              <h2>Informations du personnage</h2>

              <div class="info-grid">
                <div class="info-grid">
                  <div class="info-item">
                    <span class="label">ID :</span>
                    <span class="value">{{
                      character.id.toString().padStart(6, '0')
                    }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Date d'anniversaire :</span>
                    <span class="value">{{
                      character.createdAt | date : 'dd/MM/yyyy'
                    }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Baguette magique :</span>
                    <span class="value">{{
                      character.wand || 'Inconnue'
                    }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Patronus :</span>
                    <span class="value">{{
                      character.patronus || 'Inconnu'
                    }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Année à Poudlard :</span>
                    <span class="value">{{
                      character.year || 'Inconnue'
                    }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Rôle :</span>
                    <span class="value">{{ character.role || 'Inconnu' }}</span>
                  </div>
                  <div class="info-item description">
                    <span class="label">Description :</span>
                    <p class="value">
                      {{
                        character.description || 'Aucune description disponible'
                      }}
                    </p>
                  </div>
                </div>
              </div>

              <button class="favorite-button" (click)="toggleFavorite()">
                <i
                  [class]="
                    character.isFavorite ? 'fas fa-heart' : 'far fa-heart'
                  "
                ></i>
                {{
                  character.isFavorite
                    ? 'Retirer des favoris'
                    : 'Ajouter aux favoris'
                }}
              </button>
              <div class="add-to-cart">
                <label for="quantity-{{ character.id }}">Quantité :</label>
                <input
                  id="quantity-{{ character.id }}"
                  type="number"
                  [(ngModel)]="quantity"
                  min="1"
                  max="100"
                />
                <button class="cart-button" (click)="addToCart()">
                  <i class="fas fa-shopping-cart"></i> Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .detail-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        background: url('/assets/dark-parchment.jpg');
        min-height: 100vh;
        position: relative;
      }

      .detail-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('/assets/floating-candles.png');
        opacity: 0.15;
        animation: float 20s infinite linear;
        pointer-events: none;
      }

      @keyframes float {
        from {
          background-position: 0 0;
        }
        to {
          background-position: 0 100%;
        }
      }

      .back-button {
        background: #1a1a1a;
        border: none;
        padding: 1rem 2rem;
        cursor: pointer;
        font-size: 1.1rem;
        color: #e0b04c;
        margin-bottom: 2rem;
        font-family: 'Cinzel', serif;
        position: relative;
        overflow: hidden;
        transition: all 0.4s ease;
      }

      .back-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(224, 176, 76, 0.2),
          transparent
        );
        transition: 0.5s;
      }

      .back-button:hover::before {
        left: 100%;
      }

      .detail-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        background: rgba(20, 20, 28, 0.95);
        border-radius: 8px;
        box-shadow: 0 0 30px rgba(224, 176, 76, 0.2);
        border: 1px solid #e0b04c;
        position: relative;
        overflow: hidden;
        color: #e0e0e0;
      }

      .left-section {
        position: relative;
        overflow: hidden;
      }

      .character-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
        filter: brightness(0.9);
      }

      .left-section:hover .character-image {
        transform: scale(1.05);
      }

      .price {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(20, 20, 28, 0.9);
        color: #e0b04c;
        padding: 0.8rem 1.5rem;
        border: 1px solid #e0b04c;
        font-family: 'Cinzel', serif;
        font-weight: bold;
      }

      .right-section {
        padding: 2rem;
      }

      h1 {
        font-family: 'Cinzel Decorative', cursive;
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #e0b04c;
        text-shadow: 0 0 10px rgba(224, 176, 76, 0.3);
        border-bottom: 1px solid #e0b04c;
        padding-bottom: 0.5rem;
      }

      .house-badge {
        display: inline-block;
        padding: 0.8rem 1.5rem;
        border-radius: 4px;
        color: white;
        margin-bottom: 1rem;
        font-family: 'Cinzel', serif;
        text-transform: uppercase;
        letter-spacing: 2px;
        position: relative;
        overflow: hidden;
      }

      .gryffondor {
        background: linear-gradient(
          135deg,
          #740001 0%,
          #ae0001 50%,
          #eeba30 100%
        );
      }

      .serpentard {
        background: linear-gradient(
          135deg,
          #1a472a 0%,
          #2a623d 50%,
          #5d5d5d 100%
        );
      }

      .serdaigle {
        background: linear-gradient(
          135deg,
          #0e1a40 0%,
          #222f5b 50%,
          #946b2d 100%
        );
      }

      .poufsouffle {
        background: linear-gradient(
          135deg,
          #ecb939 0%,
          #f0c75e 50%,
          #372e29 100%
        );
      }

      .character-info {
        margin-top: 2rem;
      }

      .id {
        font-family: 'Courier New', monospace;
        color: #666;
        margin-bottom: 1rem;
      }

      .date {
        font-family: 'Courier New', monospace;
        color: #666;
        margin-bottom: 1rem;
      }

      .favorite-button,
      .cart-button {
        background: transparent;
        border: 1px solid #e0b04c;
        padding: 1rem 2rem;
        color: #e0b04c;
        cursor: pointer;
        font-family: 'Cinzel', serif;
        position: relative;
        overflow: hidden;
        transition: all 0.4s ease;
      }

      .favorite-button:hover,
      .cart-button:hover {
        background: rgba(224, 176, 76, 0.1);
        box-shadow: 0 0 15px rgba(224, 176, 76, 0.3);
      }

      .add-to-cart {
        margin-top: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .add-to-cart input {
        background: rgba(20, 20, 28, 0.9);
        border: 1px solid #e0b04c;
        color: #e0e0e0;
        padding: 0.8rem;
        width: 80px;
        text-align: center;
      }

      .character-details {
        margin: 2rem 0;
        padding: 2rem;
        background: rgba(20, 20, 28, 0.7);
        border: 1px solid #e0b04c;
        position: relative;
      }

      .character-details::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('/assets/magical-sparkles.png');
        opacity: 0.1;
        animation: sparkle 10s infinite linear;
      }

      @keyframes sparkle {
        from {
          background-position: 0 0;
        }
        to {
          background-position: 100% 100%;
        }
      }

      .character-details h2 {
        font-family: 'Cinzel Decorative', cursive;
        font-size: 1.8rem;
        color: #e0b04c;
        text-align: center;
        margin-bottom: 2rem;
      }

      .info-grid {
        display: grid;
        gap: 1.5rem;
      }

      .info-item {
        display: grid;
        grid-template-columns: 150px 1fr;
        gap: 1rem;
        align-items: center;
      }

      .info-item.description {
        grid-template-columns: 1fr;
      }

      .label {
        color: #e0b04c;
        font-family: 'Cinzel', serif;
        font-weight: 600;
      }

      .value {
        color: #e0e0e0;
      }

      .description .value {
        margin-top: 0.5rem;
        line-height: 1.6;
      }

      @media (max-width: 768px) {
        .detail-container {
          padding: 1rem;
        }

        .detail-content {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .left-section {
          max-height: 300px;
          overflow: hidden;
        }

        .right-section {
          padding: 1rem;
        }

        h1 {
          font-size: 1.8rem;
        }

        .character-details {
          padding: 1rem;
          margin: 1rem 0;
        }

        .info-item {
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }

        .add-to-cart {
          flex-direction: column;
          align-items: stretch;
        }

        .add-to-cart input {
          width: 100%;
        }

        .cart-button,
        .favorite-button {
          width: 100%;
          margin-top: 0.5rem;
        }

        .back-button {
          width: 100%;
          margin-bottom: 1rem;
        }

        .price {
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
        }

        .character-details h2 {
          font-size: 1.5rem;
        }
      }

      @media (max-width: 480px) {
        .detail-container {
          padding: 0.5rem;
        }

        h1 {
          font-size: 1.5rem;
        }

        .house-badge {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }
      }
    `,
  ],
})
export class ProductDetailComponent implements OnInit {
  character: Character | undefined;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = parseInt(params['id'], 10);
      this.character = this.productService.getProduct(id);

      if (!this.character) {
        this.router.navigate(['/']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/products-list']);
  }

  toggleFavorite() {
    if (this.character) {
      this.productService.toggleFavorite(this.character);
    }
  }

  addToCart() {
    if (this.character) {
      this.productService.addToCart(this.character, this.quantity);
      this.notificationService.show(
        `${this.quantity} exemplaire${this.quantity > 1 ? 's' : ''} ajouté${
          this.quantity > 1 ? 's' : ''
        } au panier`,
        this.character.name,
        'success'
      );
    }
  }
}
