# Ecommerce

API (NestJS), painel admin e loja (React). Cada projeto é independente.

## Estrutura

- **api/** – Backend (NestJS, Prisma, PostgreSQL)
- **admin-web/** – Painel administrativo (React, Vite)
- **store-web/** – Loja (React, Vite)

## Como rodar

Instale as dependências e suba cada projeto na sua pasta:

```bash
# API
cd api && npm install && npm run start:dev

# Admin (outro terminal)
cd admin-web && npm install && npm run dev

# Store (outro terminal)
cd store-web && npm install && npm run dev
```

API: `http://localhost:3000`  
Admin: `http://localhost:3001`  
Store: `http://localhost:3002`

Configure os arquivos `.env` em cada projeto (use os `.env.example` como base).
