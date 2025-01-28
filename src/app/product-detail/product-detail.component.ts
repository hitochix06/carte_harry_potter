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
            <p class="id">
              ID: #{{ character.id.toString().padStart(6, '0') }}
            </p>
            <p class="date">
              Date anniversaire: {{ character.createdAt | date : 'dd/MM/yyyy' }}
            </p>

            <div class="character-details">
              <h2>Informations du personnage</h2>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">Baguette magique :</span>
                  <span class="value">{{ character.wand || 'Inconnue' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">Patronus :</span>
                  <span class="value">{{
                    character.patronus || 'Inconnu'
                  }}</span>
                </div>
                <div class="info-item">
                  <span class="label">Année à Poudlard :</span>
                  <span class="value">{{ character.year || 'Inconnue' }}</span>
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
                [class]="character.isFavorite ? 'fas fa-heart' : 'far fa-heart'"
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
  `,
  styles: [
    `
      .detail-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .back-button {
        background: none;
        border: none;
        padding: 1rem;
        cursor: pointer;
        font-size: 1.1rem;
        color: #333;
        margin-bottom: 2rem;
      }

      .detail-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        background: white;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .left-section {
        position: relative;
      }

      .character-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .price {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: bold;
      }

      .right-section {
        padding: 2rem;
      }

      h1 {
        font-family: 'Playfair Display', serif;
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      .house-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        color: white;
        margin-bottom: 1rem;
      }

      .gryffondor {
        background: #740001;
      }
      .serpentard {
        background: #1a472a;
      }
      .serdaigle {
        background: #0e1a40;
      }
      .poufsouffle {
        background: #ecb939;
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

      .favorite-button {
        background: none;
        border: 2px solid #740001;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        color: #740001;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .favorite-button:hover {
        background: #740001;
        color: white;
      }

      .add-to-cart {
        margin-top: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .add-to-cart input {
        width: 80px;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 5px;
      }

      .cart-button {
        background: #1a472a;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .cart-button:hover {
        background: #2a573a;
      }

      .character-details {
        margin: 2rem 0;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 10px;
      }

      .character-details h2 {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: #333;
      }

      .info-grid {
        display: grid;
        gap: 1.2rem;
      }

      .info-item {
        display: grid;
        grid-template-columns: 150px 1fr;
        gap: 1rem;
      }

      .info-item.description {
        grid-template-columns: 1fr;
      }

      .label {
        font-weight: 600;
        color: #666;
      }

      .value {
        color: #333;
      }

      .description .value {
        margin-top: 0.5rem;
        line-height: 1.6;
      }

      @media (max-width: 768px) {
        .detail-content {
          grid-template-columns: 1fr;
        }
        .info-item {
          grid-template-columns: 1fr;
          gap: 0.3rem;
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
