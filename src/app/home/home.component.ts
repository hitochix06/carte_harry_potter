import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-[url('https://static.vecteezy.com/ti/photos-gratuite/p2/19036134-texture-de-papier-ancien-papier-vintage-background-with-copy-space-gratuit-photo.jpg')] bg-cover bg-center">
      <div class="container mx-auto px-4 py-16 text-center">
        <h1 class="text-5xl font-bold text-white mb-8 font-serif shadow-lg ">
          Bienvenue l'univers magique de Harry Potter
        </h1>
        <p class="text-white text-xl mb-8 max-w-2xl mx-auto bg-black bg-opacity-50 p-4 rounded">
          Découvrez l'univers magique de Harry Potter et rencontrez les personnages emblématiques qui ont marqué cette saga légendaire.
        </p>
        <a
          routerLink="/products-list"
          class="inline-block bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-serif text-lg"
        >
          Découvrir les personnages
        </a>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
    .font-serif {
      font-family: 'Playfair Display', serif;
    }
  `]
})
export class HomeComponent {}
