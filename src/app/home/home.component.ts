import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterModule],
  template: `
    <div
      class="min-h-screen relative bg-[url('https://images.unsplash.com/photo-1618944847828-82e943c3bdb7')] bg-cover bg-fixed"
    >
      <!-- Overlay sombre pour améliorer la lisibilité -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <!-- Contenu principal -->
      <div class="relative container mx-auto px-4 py-24 text-center">
        <!-- Effet de particules magiques -->
        <div class="absolute inset-0 sparkles"></div>

        <h1 class="text-6xl font-bold text-amber-400 mb-8 font-magical glow">
          L'Univers Magique de<br />Harry Potter
        </h1>

        <p
          class="text-gray-200 text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-magical-text"
        >
          Plongez dans un monde où la magie prend vie, où les sortilèges
          illuminent le ciel et où chaque personnage raconte une histoire
          extraordinaire.
        </p>

        <!-- Bouton stylisé -->
        <button
          [routerLink]="['/products-list']"
          class="inline-block bg-gradient-to-r from-amber-600 to-amber-800 text-white
                 px-10 py-4 rounded-full hover:scale-105 transition-all duration-300
                 font-magical-text text-xl shadow-lg hover:shadow-amber-500/50
                 cursor-pointer relative z-10"
        >
          ✨ Découvrir les Sorciers ✨
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text&display=swap');

      .font-magical {
        font-family: 'Cinzel', serif;
      }

      .font-magical-text {
        font-family: 'Crimson Text', serif;
      }

      .glow {
        text-shadow: 0 0 10px rgba(251, 191, 36, 0.5),
          0 0 20px rgba(251, 191, 36, 0.3), 0 0 30px rgba(251, 191, 36, 0.2);
      }

      .sparkles {
        background-image: url('data:image/svg+xml,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="%23fff"/></svg>');
        background-size: 50px 50px;
        animation: sparkle 3s linear infinite;
        opacity: 0.5;
      }

      @keyframes sparkle {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 100px 100px;
        }
      }
    `,
  ],
})
export class HomeComponent {}
