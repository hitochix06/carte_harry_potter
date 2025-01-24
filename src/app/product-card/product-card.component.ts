import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Character } from '../Model/character.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
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
          <p class="card-subtitle">THIS IS TO IDENTIFY</p>

          <div class="photo-frame">
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

          <div class="watermark">M</div>
        </div>
      </div>

      <div class="external-info">
        <div class="date-section">
          <i class="fas fa-calendar"></i>
          {{ character.createdDate | date:'dd/MM/yyyy' }}
        </div>
        <button class="favorite-button" (click)="switchFav()">
          <i [class]="character.isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
          {{ character.isFavorite ? '' : '' }}
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
      box-shadow:
        0 0 0 1px rgba(0,0,0,0.1),
        0 2px 6px rgba(0,0,0,0.2);
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

    .card-footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      margin-bottom: 15px;
      padding: 0 20px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      padding: 8px 20px;
    }

    .creation-date {
      font-family: 'Courier New', monospace;
      font-size: 12px;
      color: rgba(0,0,0,0.8);
      font-weight: bold;
    }

    .favorite-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      transition: transform 0.2s ease;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
    }

    .favorite-btn:hover {
      transform: scale(1.2);
    }

    .favorite-btn i {
      color: #740001;
      font-size: 20px;
    }

    .fa-heart {
      transition: color 0.3s ease;
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
    }

    .stamp-inner {
      width: 54px;
      height: 54px;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      text-align: center;
      padding: 5px;
      color: rgba(0,0,0,0.4);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 150px;
      color: rgba(0,0,0,0.03);
      font-family: 'Playfair Display', serif;
      pointer-events: none;
    }

    .external-info {
      margin-top: 20px;
      padding: 15px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 300px;
    }

    .date-section {
      font-family: 'Courier New', monospace;
      color: #333;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .date-section i {
      color: #740001;
    }

    .favorite-button {
      background: #740001;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .favorite-button:hover {
      background: #8f0001;
      transform: translateY(-2px);
    }

    .favorite-button i {
      font-size: 16px;
    }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) character: Character = {
    id: 0,
    name: '',
    isFavorite: false,
    createdDate: new Date(),
    image: '',
  };
  @Output() addItemEvent = new EventEmitter<Character>();

  switchFav() {
    this.addItemEvent.emit(this.character);
  }

  onImageError(event: any) {
    console.error('Erreur de chargement image:', event.target.src);
    event.target.src = '/assets/images/default.jpg';
  }

  getHouseColor(): string {
    const colors: { [key: number]: string } = {
      0: 'linear-gradient(135deg, #740001 0%, #ae0001 100%)',  // Gryffondor
      1: 'linear-gradient(135deg, #1a472a 0%, #2a623d 100%)',  // Serpentard
      2: 'linear-gradient(135deg, #ecb939 0%, #f0c75e 100%)',  // Poufsouffle
      3: 'linear-gradient(135deg, #0e1a40 0%, #222f5b 100%)'   // Serdaigle
    };
    return colors[this.character.id % 4] || colors[0];
  }
}
