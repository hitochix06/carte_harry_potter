import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../Model/character.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-container">
      <div class="identity-card" [ngStyle]="{'background-image': getHouseColor()}">
        <div class="vintage-texture"></div>
        <div class="card-content">
          <div class="card-header">
            <div class="card-number">#{{ character.id.toString().padStart(6, '0') }}</div>
            <div class="ministry-logo">
              <img src="assets/logoministry.png" alt="M" />
            </div>
          </div>

          <h2 class="card-title">IDENTITY CARD</h2>
          <p class="card-subtitle">{{ character.house.toUpperCase() }}</p>

          <div class="photo-frame">
            <div class="price-tag">
              {{ character.price | currency:'EUR':'symbol':'1.2-2' }}
            </div>
            <div class="photo-container">
              <img [src]="character.image"
                   [alt]="character.name"
                   (error)="onImageError($event)">
            </div>
          </div>

          <div class="signature">
            <p class="name">{{ character.name }}</p>
            <small>Signature of Holder</small>
          </div>

          <div class="stamp">
            <div class="stamp-inner">
              <span>MINISTRY OF MAGIC</span>
            </div>
          </div>
        </div>
      </div>

      <div class="external-info">
        <div class="date-section">
          <i class="fas fa-calendar"></i>
          {{ character.createdDate | date:'dd/MM/yyyy' }}
        </div>
        <button class="favorite-button" (click)="toggleFavorite()">
          <i [class]="character.isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

    .card-container {
      padding: 20px;
      perspective: 1000px;
    }

    .identity-card {
      width: 300px;
      height: 420px;
      background: #f8f5e6;
      border-radius: 15px;
      position: relative;
      box-shadow: 0 8px 25px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
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
      box-shadow: 15px 15px 30px rgba(0,0,0,0.2);
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
      color: rgba(0,0,0,0.7);
      font-size: 0.9em;
      letter-spacing: 1px;
    }

    .ministry-logo {
      width: 40px;
      height: 40px;
      opacity: 0.8;
    }

    .card-title {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      margin: 10px 0;
      color: rgba(0,0,0,0.8);
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    .card-subtitle {
      font-family: 'Playfair Display', serif;
      font-size: 12px;
      text-align: center;
      color: rgba(0,0,0,0.6);
      margin-bottom: 15px;
      letter-spacing: 1px;
    }

    .photo-frame {
      padding: 10px;
      background: #fff;
      border: 1px solid rgba(0,0,0,0.2);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.2);
      position: relative;
    }

    .photo-container {
      width: 180px;
      height: 180px;
      overflow: hidden;
      border: 1px solid rgba(0,0,0,0.3);
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
      border-top: 1px solid rgba(0,0,0,0.2);
      padding-top: 10px;
      width: 80%;
    }

    .signature .name {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      margin-bottom: 5px;
      color: rgba(0,0,0,0.8);
    }

    .signature small {
      font-size: 10px;
      color: rgba(0,0,0,0.6);
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
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      border: 2px solid rgba(0,0,0,0.2);
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
      color: rgba(0,0,0,0.6);
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
      color: rgba(0,0,0,0.03);
      pointer-events: none;
    }

    .price-tag {
      position: absolute;
      top: -10px;
      left: -15px;
      z-index: 2;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      padding: 5px 10px;
      border-radius: 15px;
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      font-weight: bold;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      transform: rotate(-5deg);
    }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) character!: Character;
  @Output() favoriteChange = new EventEmitter<Character>();

  getHouseColor(): string {
    const colors: { [key: string]: string } = {
      'Gryffondor': 'linear-gradient(135deg, #740001 0%, #ae0001 100%)',
      'Serpentard': 'linear-gradient(135deg, #1a472a 0%, #2a623d 100%)',
      'Serdaigle': 'linear-gradient(135deg, #0e1a40 0%, #222f5b 100%)',
      'Poufsouffle': 'linear-gradient(135deg, #ecb939 0%, #f0c75e 100%)'
    };
    return colors[this.character.house] || colors['Gryffondor'];
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.jpg';
  }

  toggleFavorite(): void {
    this.favoriteChange.emit(this.character);
  }
}
