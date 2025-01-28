import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../Model/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="card-container"
      (mousemove)="onMouseMove($event)"
      (mouseleave)="onMouseLeave()"
    >
      <div class="identity-card" [ngStyle]="{ transform: transform }">
        <div class="favorite-button" (click)="toggleFavorite()">
          <i
            [class]="character.isFavorite ? 'fas fa-heart' : 'far fa-heart'"
          ></i>
        </div>

        <div class="character-image">
          <img
            [src]="character.image"
            [alt]="character.name"
            class="character-photo"
          />
          <div
            class="house-badge"
            [ngClass]="character.houseColor.toLowerCase()"
          >
            <img
              [src]="
                'assets/houses/' + character.houseColor.toLowerCase() + '.png'
              "
              [alt]="character.houseColor"
              class="house-icon"
            />
          </div>
        </div>

        <div class="card-content">
          <div class="character-info">
            <h2 class="character-name">{{ character.name }}</h2>
            <span class="character-id"
              >#{{ character.id.toString().padStart(6, '0') }}</span
            >
            <div class="house-name">{{ character.houseColor }}</div>
          </div>

          <div class="card-footer">
            <div class="price">
              {{ character.price | currency : 'EUR' : 'symbol' : '1.2-2' }}
            </div>
            <button class="details-button" (click)="onDetailsClick()">
              <span>Voir plus</span>
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card-container {
        perspective: 1000px;
        padding: 20px;
      }

      .identity-card {
        width: 300px;
        position: relative;
        border-radius: 24px;
        background: #f0f0f0;
        box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
        transition: all 0.3s ease;
        padding: 20px;
      }

      .favorite-button {
        position: absolute;
        top: 15px;
        right: 15px;
        background: #ffffff;
        border: none;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 5px 5px 10px #bebebe, -5px -5px 10px #ffffff;
        z-index: 10;
        transition: all 0.3s ease;
      }

      .favorite-button i {
        color: #ff4757;
        font-size: 1.2rem;
      }

      .favorite-button:hover {
        transform: scale(1.1);
      }

      .character-image {
        position: relative;
        width: 100%;
        height: 250px;
        border-radius: 16px;
        overflow: hidden;
        margin-bottom: 20px;
      }

      .character-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .character-image:hover .character-photo {
        transform: scale(1.05);
      }

      .house-badge {
        position: absolute;
        bottom: 10px;
        left: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      .house-icon {
        width: 25px;
        height: 25px;
        object-fit: contain;
      }

      .gryffondor {
        background: linear-gradient(135deg, #740001, #d3a625);
      }
      .serpentard {
        background: linear-gradient(135deg, #1a472a, #2a623d);
      }
      .serdaigle {
        background: linear-gradient(135deg, #0e1a40, #222f5b);
      }
      .poufsouffle {
        background: linear-gradient(135deg, #ecb939, #f0c75e);
      }

      .card-content {
        padding: 10px 0;
      }

      .character-info {
        text-align: left;
        margin-bottom: 20px;
      }

      .character-name {
        font-size: 1.5rem;
        font-weight: 600;
        color: #2d3436;
        margin: 0;
        line-height: 1.2;
      }

      .character-id {
        font-size: 0.8rem;
        color: #636e72;
        display: block;
        margin-top: 5px;
      }

      .house-name {
        font-size: 0.9rem;
        color: #636e72;
        margin-top: 5px;
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
      }

      .price {
        font-size: 1.2rem;
        font-weight: 600;
        color: #2d3436;
      }

      .details-button {
        padding: 10px 20px;
        border: none;
        border-radius: 12px;
        background: #ffffff;
        box-shadow: 5px 5px 10px #bebebe, -5px -5px 10px #ffffff;
        color: #2d3436;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .details-button:hover {
        transform: translateY(-2px);
        box-shadow: 8px 8px 15px #bebebe, -8px -8px 15px #ffffff;
      }

      .details-button i {
        font-size: 0.9rem;
        transition: transform 0.3s ease;
      }

      .details-button:hover i {
        transform: translateX(4px);
      }

      @media (max-width: 768px) {
        .identity-card {
          width: 280px;
        }

        .character-image {
          height: 220px;
        }
      }

      @media (max-width: 480px) {
        .identity-card {
          width: 260px;
        }

        .character-image {
          height: 200px;
        }

        .details-button {
          padding: 8px 16px;
        }
      }
    `,
  ],
})
export class ProductCardComponent {
  @Input({ required: true }) character!: Character;
  @Output() favoriteChange = new EventEmitter<Character>();
  @Output() detailsClick = new EventEmitter<Character>();
  transform: string = '';

  constructor(private router: Router) {}

  getHouseColor(): string {
    const colors: { [key: string]: string } = {
      Gryffondor: 'linear-gradient(135deg, #740001 0%, #ae0001 100%)',
      Serpentard: 'linear-gradient(135deg, #1a472a 0%, #2a623d 100%)',
      Serdaigle: 'linear-gradient(135deg, #0e1a40 0%, #222f5b 100%)',
      Poufsouffle: 'linear-gradient(135deg, #ecb939 0%, #f0c75e 100%)',
    };
    return colors[this.character.houseColor] || colors['Gryffondor'];
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.jpg';
  }

  toggleFavorite(): void {
    this.favoriteChange.emit(this.character);
  }

  onMouseMove(e: MouseEvent): void {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    this.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `;
  }

  onMouseLeave(): void {
    this.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
  }

  onDetailsClick(): void {
    this.router.navigate(['/product-detail', this.character.id]);
  }
}
