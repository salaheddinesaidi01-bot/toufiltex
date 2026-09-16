# TOUFILTEX - Manufacture & Négoce Textile B2B

Application web moderne Full-Stack pour la manufacture textile **Toufiltex** :
- **Site vitrine haut de gamme** présentant le savoir-faire industriel, les ateliers de filature, tissage jacquard et ennoblissement.
- **Catalogue interactif de tissus & fils** avec recherche instantanée, filtres dynamiques (grammage, composition, usage, certifications OEKO-TEX / GOTS / M1).
- **Fiches techniques produits** détaillées avec téléchargement de spécifications, coloris et choix des métrages.
- **Système de demande de devis & échantillonnage** avec panier interactif, sélection d'échantillons gratuits et formulaire professionnel B2B.
- **Tableau de bord d'administration** pour le suivi et le traitement des demandes de devis reçues.

---

## 🛠 Stack Technique

- **Frontend & Backend** : [Next.js 15](https://nextjs.org/) (App Router, Server Actions, Route Handlers) & React 19
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Styles** : Vanilla CSS moderne (design tokens, glassmorphism, responsive)
- **Base de Données** : [PostgreSQL](https://www.postgresql.org/) avec l'ORM [Prisma](https://www.prisma.io/)
- **Icônes** : [Lucide React](https://lucide.dev/)

---

## 🚀 Démarrage Rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration de la base de données PostgreSQL
Renseignez la chaîne de connexion dans le fichier `.env` :
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/toufiltex?schema=public"
```

Pour synchroniser le schéma avec PostgreSQL et générer le client Prisma :
```bash
npx prisma generate
npx prisma db push
npm run prisma:seed
```

### 3. Lancement du serveur de développement
```bash
npm run dev
```
L'application est accessible sur [http://localhost:3000](http://localhost:3000) (ou `http://localhost:3001` si le port 3000 est occupé).

---

## 📂 Structure du Projet

```text
toufiltex/
├── prisma/
│   ├── schema.prisma            # Schéma de base de données PostgreSQL
│   └── seed.js                  # Script d'alimentation initiale de la BDD
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout global avec navigation et pied de page
│   │   ├── globals.css          # Thème et design system textile haut de gamme
│   │   ├── page.tsx             # Page d'accueil (Hero, Savoir-faire, Produits phares)
│   │   ├── catalogue/
│   │   │   ├── page.tsx         # Catalogue complet avec filtres et recherche
│   │   │   └── [id]/page.tsx    # Fiche technique détaillée du tissu
│   │   ├── devis/
│   │   │   └── page.tsx         # Panier et formulaire de demande de devis
│   │   ├── a-propos/
│   │   │   └── page.tsx         # Histoire, manufacture et engagements RSE
│   │   ├── contact/
│   │   │   └── page.tsx         # Coordonnées et prise de contact
│   │   ├── admin/
│   │   │   └── page.tsx         # Back-office de suivi des devis
│   │   └── api/
│   │       ├── devis/route.ts   # API de soumission et consultation des devis
│   │       └── produits/route.ts# API de recherche et filtrage des matières
│   ├── components/
│   │   ├── Navbar.tsx           # Barre de navigation avec compteur de devis
│   │   ├── Footer.tsx           # Pied de page avec certifications
│   │   ├── ProductCard.tsx      # Carte tissu avec ajout rapide au devis
│   │   └── QuoteDrawer.tsx      # Tiroir latéral de demande de devis
│   └── lib/
│       ├── types.ts             # Définitions TypeScript
│       ├── data.ts              # Données du catalogue textile et fallback
│       ├── prisma.ts            # Client singleton Prisma
│       └── cart-context.tsx     # Gestion de l'état du panier de devis
├── .env                         # Variables d'environnement
├── package.json
└── tsconfig.json
```

---

## ⚡ Superpowers Skills Framework
Le plugin **Superpowers** ([obra/superpowers](https://github.com/obra/superpowers.git)) est installé dans votre environnement Antigravity global (`~/.gemini/config/plugins/superpowers`). Il apporte 14 compétences agentiques (TDD, brainstorming, planification rigoureuse, revues de code et subagents).