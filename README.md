# 🛠 Planning Maintenance — LHTE

Application web pour planifier et suivre la maintenance des installations du site
(aiguilles ADV, circuits de voie, signaux, PN, centres poste, caténaire, wagons…).
Même principe que **Suivi Trains** : une seule page, installable sur PC et téléphone (PWA),
qui fonctionne aussi hors ligne, avec l’animation du logo LHTE à l’ouverture et une
animation de fermeture.

## Ce que fait l’application

- **Accueil** en cercles à déplier : programme de la semaine suivante à valider,
  réalisations à confirmer, demandes à planifier, délais entre contrôles,
  contrôles en retard, graissage du mois, semaine en cours, théorique / réel.
- **Demandes** reçues des mainteneurs (formulaire guidé par l’onglet Données
  de la note travaux) et **fenêtre de réception** d’un tableau collé.
- **Planification** sur les créneaux (capacité, ZEP, indisponibilités).
- **Programme** hebdomadaire : validation, PDF, mail « Information travaux ».
- **Théorique / réel**, **Semaine**, **Mois**, **Année**, **Tâches**.
- **Statistiques** : contrôles par équipement, réel − théorique, intervalle
  entre deux contrôles comparé à la périodicité (trop rapproché / dépassé).
- **Graissage** : registre mensuel quinzaine + complet, avec couleurs.
- **Wagons** : identification de la société à partir du numéro.
- **Import Excel** du PDM (GMAO) et de la note travaux (feuilles S1…S52, STATS, Données).
- Bouton **✔ Terminé** : sauvegarde, propose une copie `.json`, joue
  l’animation de fermeture puis ferme l’application.

## Publier sur GitHub Pages

1. Sur GitHub, ouvrez le dépôt › **Settings** › **Pages**.
2. *Source* : **Deploy from a branch**, branche **main**, dossier **/ (root)** › **Save**.
3. Après une minute, l’adresse s’affiche, du type
   `https://lechatiti76-stack.github.io/planning-maintenance/`.

## Installer sur le PC ou le téléphone

- **Dans l’application** : bouton **⬇ Appli** en haut (ou « Installer l’appli » sur l’accueil).
  Sur Chrome / Edge, l’application s’installe dans sa propre fenêtre avec un raccourci sur le bureau.
  Sur Windows, un raccourci `.url` à poser sur le bureau est aussi proposé.

- **Android (Chrome)** : ouvrez l’adresse › menu ⋮ › *Installer l’application*.
- **iPhone (Safari)** : ouvrez l’adresse › bouton Partager › *Sur l’écran d’accueil*.

## Premier lancement : récupérer vos données

Le dépôt est public : **il ne contient aucune donnée du site** (ni tâches,
ni noms de demandeurs, ni numéros de wagons). Au premier lancement :

1. L’écran « Aucune tâche » propose **Restaurer une sauvegarde .json…**
2. Choisissez le fichier `Sauvegarde_maintenance_….json` (export de l’application).

Vous pouvez aussi partir de zéro avec **Importer un fichier Excel** (PDM puis note travaux).

## Apparence

**Paramètres › Apparence** : thèmes de fond (Nuit LHTE par défaut, Poste de contrôle,
Signal, Aurore, classiques clair et sombre) ou **votre photo** avec un voile réglable.
Réglage propre à chaque appareil.

## Où sont les données ?

Dans le navigateur de l’appareil (stockage local), comme Suivi Trains.
Conséquences :

- chaque appareil a sa propre copie ;
- pour passer d’un appareil à l’autre : **✔ Terminé** › sauvegarde `.json`
  sur l’ancien, puis **Paramètres › Sauvegarde › Restaurer** sur le nouveau ;
- gardez régulièrement une sauvegarde `.json` en lieu sûr (le bouton
  **✔ Terminé** la propose à chaque fermeture).

## Mettre à jour l’application

Remplacez `index.html` (et `service-worker.js`, dont le numéro de version
change à chaque publication). Les appareils récupèrent la nouvelle version
au lancement suivant ; les données restent en place.

## Contenu du dépôt

```
index.html            l’application complète (HTML, CSS et JavaScript)
manifest.json         installation sur téléphone (PWA)
service-worker.js     fonctionnement hors ligne
assets/
  lhte-logo-anim.mp4  animation du logo LHTE (intro et fermeture)
  icons/              icônes de l’application
```

Bibliothèques chargées depuis cdnjs (mises en cache pour le hors-ligne) :
SheetJS (Excel), jsPDF et jsPDF-AutoTable (PDF).
