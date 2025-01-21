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
      background-image: url('data:image/png;base64,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');
      opacity: 0.1;
    }

    .card-content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
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
