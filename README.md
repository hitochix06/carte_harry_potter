# CarteHarryPotter

Une application Angular permettant de gérer une collection de cartes Harry Potter.

## Prérequis

- Node.js (version 18 ou supérieure)
- NPM (version 9 ou supérieure)
- Angular CLI (version 19.1.3)

## Installation

1. Clonez le dépôt :
```bash
git clone [URL_DU_REPO]
cd CarteHarryPotter
```

2. Installez les dépendances :
```bash
npm install
```

## Démarrage du projet

Pour lancer le serveur de développement :
```bash
ng serve
```
L'application sera accessible à l'adresse `http://localhost:4200/`

## Fonctionnalités

- 🎴 Affichage des cartes Harry Potter
- ⭐ Gestion des favoris
- 🔍 Recherche et tri des cartes
- 📱 Interface responsive

## Structure du projet

```
src/
├── app/
│   ├── components/
│   │   ├── product-card/     # Composant de carte
│   │   ├── home/            # Page d'accueil
│   │   └── favorites/       # Page des favoris
│   ├── services/
│   │   └── product.service.ts
│   └── pipes/
│       └── sort-by-name.pipe.ts
```

## Tests

### Tests unitaires
```bash
ng test
```

### Tests end-to-end
```bash
ng e2e
```

## Build Production

Pour générer une version de production :
```bash
ng build --prod
```
Les fichiers seront générés dans le dossier `dist/`.

## Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Ressources utiles

- [Documentation Angular](https://angular.dev/)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Material](https://material.angular.io/)

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

