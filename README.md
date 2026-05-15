

# Event Management App

Application fullstack de gestion d’événements développée avec React, Node.js, TypeScript, Prisma et PostgreSQL.

## Fonctionnalités

- Authentification JWT
- Gestion des événements (CRUD)
- Inscription à un événement
- Génération de QR Code
- Dashboard organisateur
- Recherche et filtres
- Export CSV
- Docker & CI/CD

---

# Stack Technique

## Frontend
- React
- Vite
- TypeScript
- Material UI
- React Query
- React Hook Form
- Axios
- Chart.js

## Backend
- Node.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- Zod

## DevOps
- Docker
- Docker Compose
- GitHub Actions

---

# Architecture

```bash
event-management-app/
├── frontend/
├── backend/
├── docker-compose.yml
└── README.md
```

---

# Installation

## 1. Cloner le projet

```bash
git clone https://github.com/your-org/event-management-app.git

cd event-management-app
```

---

# Variables d’environnement

Créer un fichier `.env` à partir du `.env.example`

```bash
cp .env.example .env
```

---

# Exemple `.env`

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/eventdb

JWT_SECRET=your_secret_key

FRONTEND_URL=http://localhost:5173

PORT=5000
```

---

# Installation Backend

```bash
cd backend

npm install
```

---

# Installation Frontend

```bash
cd frontend

npm install
```

---

# Lancer Docker

Depuis la racine :

```bash
docker-compose up -d
```

---

# Prisma

## Générer le client Prisma

```bash
npx prisma generate
```

## Migration

```bash
npx prisma migrate dev --name init
```

## Seed

```bash
node prisma/seed.js
```

---

# Démarrage du backend

```bash
cd backend

npm run dev
```

Backend disponible sur :

```bash
http://localhost:5000
```

---

# Démarrage du frontend

```bash
cd frontend

npm run dev
```

Frontend disponible sur :

```bash
http://localhost:5173
```

---

# Workflow Git

## Branches

- main → production
- develop → développement principal
- feature/*
- fix/*
- hotfix/*

---

# Convention des commits

```bash
feat:
fix:
docs:
refactor:
test:
style:
```

Exemple :

```bash
git commit -m "feat: add authentication routes"
```

---

# Workflow équipe

1. Créer une branche feature
2. Développer la fonctionnalité
3. Push
4. Ouvrir une Pull Request
5. Code Review
6. Merge vers develop

---

# Scripts utiles

## Backend

```bash
npm run dev
npm run build
npm run test
npm run lint
```

## Frontend

```bash
npm run dev
npm run build
npm run test
npm run lint
```

---

# Tests

## Backend
- Jest
- Supertest

## Frontend
- React Testing Library

## E2E
- Cypress

---

# Sécurité

- JWT Authentication
- bcrypt password hashing
- Helmet
- CORS
- Rate Limit
- Zod validation
- CSRF protection

---

# CI/CD

GitHub Actions :
- lint
- tests
- build
- docker

---

# Déploiement

Compatible avec :
- Render
- Railway
- Fly.io
- Heroku

---

# Contributeurs

- Team Fullstack Event Management

