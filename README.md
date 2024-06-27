# Espérance de vie en France

## Vue d'ensemble

Ce projet est une application web basée sur React qui affiche l'espérance de vie moyenne dans différentes villes de France. Les utilisateurs peuvent rechercher des villes par leur nom, leur département, leur région ou leur espérance de vie. Les données sont récupérées depuis une API backend, et l'application prend en charge la pagination pour faciliter la navigation.

## Fonctionnalités

- Affichage de l'espérance de vie moyenne pour les villes de France.
- Fonctionnalité de recherche par nom de ville, nom de département, nom de région et espérance de vie.
- Pagination pour naviguer facilement à travers les résultats.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js
- npm (ou yarn)
- Python 3.x
- MySQL

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/votre-projet.git
   cd votre-projet
   ```

2. Installez les dépendances frontend :
   ```bash
   npm install
   ```

3. Configurez l'API backend :
   - Assurez-vous que votre API backend est configurée et fonctionne à l'adresse `http://localhost:3000`.

4. Installez les dépendances Python :
   ```bash
   pip install -r requirements.txt
   ```

5. Configurez MySQL :
   - Assurez-vous que MySQL est installé et en cours d'exécution sur votre machine.
   - Modifiez les informations de connexion MySQL dans le fichier `load_data.py` si nécessaire.

## Chargement des données

1. Placez le fichier CSV contenant les données dans le répertoire `data` et assurez-vous qu'il s'appelle `esperance-de-vie-par-villes.csv`.

2. Exécutez le script Python pour charger les données dans la base de données MySQL :
   ```bash
   python load_data.py
   ```

## Utilisation

Pour démarrer l'application en mode développement, exécutez :

```bash
npm start
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application dans votre navigateur.

## Structure du Projet

- `src/components/SearchBar.js` : Composant de la barre de recherche.
- `src/pages/Home.js` : Page principale où sont affichées les villes et les informations.
- `src/index.js` : Point d'entrée de l'application.
- `load_data.py` : Script Python pour charger les données dans la base de données MySQL.
- `requirements.txt` : Fichier des dépendances Python.

## Fonctionnement

### Composant SearchBar

Le composant `SearchBar` permet aux utilisateurs de saisir des critères de recherche et de sélectionner le type de recherche (ville, département, région, espérance de vie). Lors de la soumission du formulaire, il déclenche la recherche correspondante.

### Page Home

La page `Home` affiche les résultats de la recherche, gère la pagination et effectue les requêtes à l'API backend pour récupérer les données des villes. Les utilisateurs peuvent naviguer entre les pages de résultats et effectuer des recherches en fonction de différents critères.

### Script Python `load_data.py`

Ce script lit les données à partir d'un fichier CSV, les transforme et les charge dans une base de données MySQL. Il crée les tables nécessaires (`regions`, `departments`, `life_expectancy`, `cities`) et insère les données correspondantes.

## Exemple d'Utilisation

Pour rechercher une ville, sélectionnez "Ville" dans le menu déroulant, saisissez le nom de la ville dans le champ de recherche et cliquez sur "Rechercher". Les résultats s'afficheront dans la grille en dessous de la barre de recherche. Vous pouvez également naviguer entre les pages de résultats en utilisant les boutons "Précédent" et "Suivant".

