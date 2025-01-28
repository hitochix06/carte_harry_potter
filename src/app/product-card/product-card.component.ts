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
        perspective: 2000px;
        padding: 20px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100%;
        width: 100%;
      }

      .identity-card {
        width: 300px;
        position: relative;
        border-radius: 15px;
        background: #1a1a24;
        border: 3px solid transparent;
        background-clip: padding-box;
        padding: 20px;
        color: #fff;
        transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        margin: 0 auto;
      }

      .identity-card::before {
        content: '';
        position: absolute;
        inset: -3px;
        z-index: -1;
        border-radius: 15px;
        background: linear-gradient(
          45deg,
          #ffd700,
          #c0a45e,
          #4a4a4a,
          #c0a45e,
          #ffd700
        );
        background-size: 400% 400%;
        animation: gradientMove 15s ease infinite;
        filter: blur(4px);
      }

      .identity-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      }

      .character-image {
        position: relative;
        width: 100%;
        height: 280px;
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 20px;
      }

      .character-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.5s ease;
        filter: sepia(0.2);
      }

      .character-image::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(26, 26, 36, 0) 0%,
          rgba(26, 26, 36, 0.8) 100%
        );
      }

      .character-image:hover .character-photo {
        transform: scale(1.1);
        filter: sepia(0);
      }

      .house-badge {
        position: absolute;
        bottom: 15px;
        left: 15px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        animation: magicFloat 6s ease-in-out infinite;
      }

      .house-icon {
        width: 35px;
        height: 35px;
        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7));
        animation: magicSpin 20s linear infinite;
      }

      .gryffondor {
        background: radial-gradient(circle at 30% 30%, #d3a625, #740001);
        border: 2px solid #ffd700;
      }
      .serpentard {
        background: radial-gradient(circle at 30% 30%, #2a623d, #1a472a);
        border: 2px solid #silver;
      }
      .serdaigle {
        background: radial-gradient(circle at 30% 30%, #222f5b, #0e1a40);
        border: 2px solid #bronze;
      }
      .poufsouffle {
        background: radial-gradient(circle at 30% 30%, #f0c75e, #ecb939);
        border: 2px solid #000000;
      }

      .favorite-button {
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 10;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.4s ease;
      }

      .favorite-button i {
        color: #ff4757;
        font-size: 1.2rem;
        transition: all 0.4s ease;
      }

      .favorite-button:hover {
        transform: scale(1.15);
        background: rgba(255, 71, 87, 0.2);
      }

      .favorite-button:hover i {
        transform: scale(1.2);
        filter: drop-shadow(0 0 5px rgba(255, 71, 87, 0.8));
      }

      .character-name {
        font-family: 'Playfair Display', serif;
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(45deg, #ffd700, #ffffff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
        line-height: 1.2;
        position: relative;
      }

      .character-id {
        font-family: 'Courier Prime', monospace;
        font-size: 0.9rem;
        color: #fff;
        letter-spacing: 2px;
        margin-top: 8px;
      }

      .house-name {
        font-size: 1.1rem;
        font-family: 'Crimson Text', serif;
        color: #fff;
        margin-top: 8px;
        font-style: italic;
        text-shadow: 0 0 10px rgba(192, 164, 94, 0.3);
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 25px;
        padding-top: 15px;
        border-top: 1px solid rgba(192, 164, 94, 0.3);
      }

      .price {
        font-size: 1.4rem;
        font-weight: 700;
        background: linear-gradient(45deg, #ffd700, #c0a45e);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .details-button {
        padding: 12px 24px;
        background: transparent;
        border: none;
        position: relative;
        color: #fff;
        font-family: 'Playfair Display', serif;
        font-size: 1rem;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.4s ease;
      }

      .details-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #ffd700, #c0a45e);
        opacity: 0.2;
        z-index: -1;
        transition: all 0.4s ease;
        transform: skewX(-15deg);
      }

      .details-button:hover::before {
        transform: skewX(-15deg) scale(1.2);
        opacity: 0.4;
      }

      .details-button i {
        margin-left: 8px;
        transition: transform 0.3s ease;
      }

      .details-button:hover i {
        transform: translateX(5px);
      }

      @keyframes gradientMove {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      @keyframes magicFloat {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        25% {
          transform: translateY(-8px) rotate(3deg);
        }
        75% {
          transform: translateY(8px) rotate(-3deg);
        }
      }

      @keyframes magicSpin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @media (max-width: 1200px) {
        .identity-card {
          width: 290px;
        }
        .character-image {
          height: 260px;
        }
        .character-name {
          font-size: 1.6rem;
        }
      }

      @media (max-width: 768px) {
        .card-container {
          padding: 15px;
        }

        .identity-card {
          width: 260px;
          padding: 15px;
        }

        .character-image {
          height: 230px;
        }

        .character-name {
          font-size: 1.4rem;
        }

        .house-badge {
          width: 40px;
          height: 40px;
        }

        .house-icon {
          width: 28px;
          height: 28px;
        }

        .price {
          font-size: 1.2rem;
        }

        .details-button {
          padding: 10px 20px;
          font-size: 0.9rem;
        }
      }

      @media (max-width: 480px) {
        .card-container {
          padding: 10px;
          min-height: auto;
        }

        .identity-card {
          width: 100%;
          max-width: 240px;
          padding: 12px;
          margin: 0 auto;
        }

        .character-image {
          height: 200px;
          margin-bottom: 15px;
        }

        .character-name {
          font-size: 1.2rem;
        }

        .character-id {
          font-size: 0.8rem;
        }

        .house-name {
          font-size: 1rem;
        }

        .house-badge {
          width: 35px;
          height: 35px;
          bottom: 10px;
          left: 10px;
        }

        .house-icon {
          width: 24px;
          height: 24px;
        }

        .favorite-button {
          width: 35px;
          height: 35px;
          top: 10px;
          right: 10px;
        }

        .card-footer {
          margin-top: 15px;
          padding-top: 12px;
        }

        .price {
          font-size: 1.1rem;
        }

        .details-button {
          padding: 8px 16px;
          font-size: 0.85rem;
        }
      }

      @media (max-width: 360px) {
        .identity-card {
          max-width: 220px;
        }

        .character-image {
          height: 180px;
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
