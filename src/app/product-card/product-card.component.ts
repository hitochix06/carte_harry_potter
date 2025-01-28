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
      <div
        class="identity-card"
        [ngStyle]="{
          'background-image': getHouseColor(),
          transform: transform
        }"
      >
        <div class="vintage-texture"></div>
        <div class="card-content">
          <div class="card-header">
            <div class="card-number">
              #{{ character.id.toString().padStart(6, '0') }}
            </div>
            <button class="favorite-button" (click)="toggleFavorite()">
              <i
                [class]="character.isFavorite ? 'fas fa-heart' : 'far fa-heart'"
              ></i>
            </button>
          </div>
          <div class="ministry-logo">
            <img src="assets/logoministry.png" alt="M" />
          </div>
          <h2 class="card-title">IDENTITY CARD</h2>
          <p class="card-subtitle">{{ character.houseColor.toUpperCase() }}</p>

          <div class="photo-container">
            <div class="price-tag">
              {{ character.price | currency : 'EUR' : 'symbol' : '1.2-2' }}
            </div>
            <img
              [src]="character.image"
              [alt]="character.name"
              class="character-photo"
            />
          </div>

          <div class="signature">
            <p class="name">{{ character.name }}</p>
            <small>Signature of Holder</small>
          </div>

          <button class="details-button" (click)="onDetailsClick()">
            Voir détails
          </button>

          <div class="stamp">
            <div class="stamp-inner">MINISTRY OF MAGIC</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

      .card-container {
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .identity-card {
        width: 100%;
        max-width: 300px;
        height: auto;
        aspect-ratio: 3/4.2;
        background: #f8f5e6;
        border-radius: 15px;
        position: relative;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        overflow: hidden;
      }

      .vintage-texture {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('src/assets/arriereplan.jpg');
        background-repeat: repeat;
        background-size: 200px;
        opacity: 0.5;
        transform: translateZ(10px);
      }

      .card-content {
        position: relative;
        z-index: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px;
      }

      .identity-card:hover {
        transform: translateY(-5px) rotateY(5deg);
        box-shadow: 15px 15px 30px rgba(0, 0, 0, 0.2);
      }

      .card-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .card-number {
        font-family: 'Courier New', monospace;
        color: rgba(0, 0, 0, 0.7);
        font-size: 0.9em;
        letter-spacing: 1px;
      }

      .ministry-logo {
        width: 40px;
        height: 40px;
        opacity: 0.8;
        transform: translateZ(20px);
      }

      .card-title {
        font-family: 'Playfair Display', serif;
        font-size: clamp(18px, 4vw, 24px);
        font-weight: 700;
        text-align: center;
        margin: 10px 0;
        color: rgba(0, 0, 0, 0.8);
        letter-spacing: 3px;
        text-transform: uppercase;
        transform: translateZ(20px);
      }

      .card-subtitle {
        font-family: 'Playfair Display', serif;
        font-size: 12px;
        text-align: center;
        color: rgba(0, 0, 0, 0.6);
        margin-bottom: 15px;
        letter-spacing: 1px;
        transform: translateZ(20px);
      }

      .photo-container {
        width: 60%;
        max-width: 180px;
        aspect-ratio: 1/1;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.3);
      }

      .photo-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .photo-container:hover img {
        transform: scale(1.05);
      }

      .signature {
        text-align: center;
        margin-top: 20px;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        padding-top: 10px;
        width: 80%;
        transform: translateZ(20px);
      }

      .signature .name {
        font-family: 'Playfair Display', serif;
        font-size: clamp(18px, 4vw, 24px);
        margin-bottom: 5px;
        color: rgba(0, 0, 0, 0.8);
      }

      .signature small {
        font-size: 10px;
        color: rgba(0, 0, 0, 0.6);
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .external-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 8px;
        margin-top: 10px;
      }

      .date-section {
        font-size: 0.9em;
        color: #666;
      }

      .favorite-button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.2em;
        color: #740001;
        transition: transform 0.2s ease;
      }

      .favorite-button:hover {
        transform: scale(1.1);
      }

      .stamp {
        position: absolute;
        bottom: 68px;
        right: 26px;
        width: 60px;
        height: 60px;
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(-15deg);
        opacity: 0.8;
      }

      .stamp-inner {
        font-size: 8px;
        text-align: center;
        line-height: 1;
        color: rgba(0, 0, 0, 0.6);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .watermark {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Playfair Display', serif;
        font-size: 120px;
        color: rgba(0, 0, 0, 0.03);
        pointer-events: none;
      }

      .price-tag {
        position: absolute;
        top: 37%;
        left: 12%;
        z-index: 2;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 5px 10px;
        border-radius: 15px;
        font-family: 'Playfair Display', serif;
        font-size: clamp(14px, 3vw, 17px);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        transform: rotate(-20deg);
      }

      .details-button {
        position: absolute;
        bottom: 21%;
        left: 50%;
        transform: translateX(-50%) translateZ(20px);
        padding: 8px 16px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        border: none;
        border-radius: 20px;
        font-family: 'Playfair Display', serif;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 2;
      }

      .details-button:hover {
        background: rgba(0, 0, 0, 0.9);
        transform: translateX(-50%) translateZ(20px) scale(1.05);
      }

      @media (max-width: 768px) {
        .card-container {
          padding: 10px;
        }

        .card-number {
          font-size: 0.8em;
        }

        .ministry-logo {
          width: 30px;
          height: 30px;
        }

        .card-subtitle {
          font-size: 10px;
        }

        .signature small {
          font-size: 8px;
        }

        .stamp {
          width: 50px;
          height: 50px;
          bottom: 60px;
          right: 20px;
        }

        .stamp-inner {
          font-size: 6px;
        }
      }

      @media (max-width: 480px) {
        .identity-card {
          max-width: 250px;
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
