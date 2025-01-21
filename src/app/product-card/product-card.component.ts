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
      <div class="identity-card" [ngStyle]="{'background-color': getHouseColor()}">
        <div class="card-header">
          <div class="card-number">#{{ character.id.toString().padStart(6, '0') }}</div>
          <div class="ministry-logo">M</div>
        </div>
        <h2 class="card-title">Carte d'identité</h2>
        <p class="card-subtitle">Ce document est utilisé pour identifier les personnages</p>
        <p class="card-subtitle">Créé le: {{ character.createdDate | date: 'dd/MM/yyyy' }}</p>

        <div class="photo-container">
          <img [src]="character.image"
               [alt]="character.name"
               (error)="onImageError($event)">
        </div>

        <div class="signature">
          <p class="name">{{ character.name }}</p>
          <small>Signature of Holder</small>
        </div>
        <div class="stamp"></div>
      </div>
    </div>
  `,
  styles: [`
    .card-container {
      padding: 20px;
      perspective: 1000px;
    }

    .identity-card {
      width: 300px;
      height: 420px;
      background: #f5f5f5;
      border-radius: 15px;
      padding: 20px;
      position: relative;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      transition: transform 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .identity-card:hover {
      transform: translateY(-5px) rotateY(5deg);
    }

    .card-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .card-number {
      font-family: monospace;
      color: rgba(0,0,0,0.7);
    }

    .ministry-logo {
      font-size: 24px;
      font-weight: bold;
      color: rgba(0,0,0,0.7);
    }

    .card-title {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin: 10px 0;
      color: rgba(0,0,0,0.8);
      letter-spacing: 2px;
    }

    .card-subtitle {
      font-size: 12px;
      text-align: center;
      color: rgba(0,0,0,0.6);
      margin-bottom: 15px;
    }

    .photo-container {
      width: 200px;
      height: 200px;
      border: 8px solid #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      margin: 10px auto;
    }

    .photo-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .signature {
      text-align: center;
      margin-top: 15px;
      border-top: 1px solid rgba(0,0,0,0.2);
      padding-top: 10px;
      width: 80%;
    }

    .signature .name {
      font-family: 'Brush Script MT', cursive;
      font-size: 24px;
      margin-bottom: 5px;
    }

    .signature small {
      font-size: 10px;
      color: rgba(0,0,0,0.6);
    }

    .stamp {
      position: absolute;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 50%;
      opacity: 0.3;
    }
  `],
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
    // Vous pouvez implémenter une logique pour attribuer des couleurs différentes
    // basées sur certains critères (comme l'ID du personnage)
    const colors = [
      'rgba(255, 215, 0, 0.1)',  // Jaune pour Poufsouffle
      'rgba(0, 100, 0, 0.1)',    // Vert pour Serpentard
      'rgba(139, 0, 0, 0.1)',    // Rouge pour Gryffondor
      'rgba(0, 0, 139, 0.1)',    // Bleu pour Serdaigle
    ];
    return colors[this.character.id % colors.length];
  }
}
