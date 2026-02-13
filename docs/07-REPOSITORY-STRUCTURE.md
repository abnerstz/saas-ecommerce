# Estrutura de Repositórios - Monolito Modular

## Estratégia: Monorepo Único

### Decisão Arquitetural
**Um único repositório** contendo todo o sistema, organizado como **monorepo** com workspaces npm/yarn.

**Por que monorepo?**
- ✅ **Versionamento unificado** - Uma única fonte da verdade
- ✅ **Deploys coordenados** - Frontend e backend sempre sincronizados
- ✅ **Shared code fácil** - Tipos, utilitários compartilhados
- ✅ **Refactoring seguro** - Mudanças em toda a stack de uma vez
- ✅ **CI/CD simplificado** - Um pipeline para tudo
- ✅ **Desenvolvimento local** - Setup único, dependências gerenciadas

## Estrutura Completa do Repositório

```
saas-ecommerce/
├── .github/                    # GitHub Actions workflows
│   ├── workflows/
│   │   ├── backend-test.yml
│   │   ├── frontend-test.yml
│   │   ├── deploy-staging.yml
│   │   └── deploy-production.yml
│   └── ISSUE_TEMPLATE/
│
├── backend/                    # NestJS API (Monolito Modular)
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── common/            # Shared utilities, guards, interceptors
│   │   │   ├── decorators/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── pipes/
│   │   │   └── filters/
│   │   ├── auth/              # Authentication module
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── strategies/
│   │   │   └── dto/
│   │   ├── users/             # Users management
│   │   ├── tenants/           # Multi-tenancy
│   │   ├── products/          # Products management
│   │   ├── orders/            # Orders processing
│   │   ├── payments/          # Payment gateways
│   │   ├── notifications/     # Notifications system
│   │   ├── analytics/         # Analytics and reports
│   │   ├── customization/     # Niche customizations
│   │   └── integrations/      # External APIs
│   ├── prisma/                # Database schema and migrations
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   ├── test/                  # Tests
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── config/                # Configuration files
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── apps/                      # Frontend Applications
│   ├── admin/                 # Admin Dashboard (React + Shadcn/UI)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── stores/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── public/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   └── tsconfig.json
│   │
│   ├── ecommerce/             # Customer Store (React + Shadcn/UI)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── stores/
│   │   │   ├── themes/        # Niche-specific themes
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── public/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   └── tsconfig.json
│   │
│   └── landing/               # Marketing Landing (HTML Static)
│       ├── src/
│       │   ├── pages/         # Static HTML pages
│       │   │   ├── index.html
│       │   │   ├── restaurant.html
│       │   │   ├── fashion.html
│       │   │   ├── digital.html
│       │   │   └── pricing.html
│       │   ├── assets/
│       │   │   ├── css/
│       │   │   ├── js/
│       │   │   ├── images/
│       │   │   └── icons/
│       │   └── templates/
│       ├── dist/              # Built files
│       ├── package.json
│       └── webpack.config.js
│
├── packages/                  # Shared Libraries
│   ├── ui/                    # Shared UI Components
│   │   ├── src/
│   │   │   ├── components/    # Reusable components
│   │   │   │   ├── Button/
│   │   │   │   ├── Input/
│   │   │   │   ├── Modal/
│   │   │   │   └── index.ts
│   │   │   ├── hooks/         # Shared hooks
│   │   │   ├── utils/         # UI utilities
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── types/                 # Shared TypeScript Types
│   │   ├── src/
│   │   │   ├── api/           # API types
│   │   │   ├── entities/      # Database entities
│   │   │   ├── common/        # Common types
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── utils/                 # Shared Utilities
│   │   ├── src/
│   │   │   ├── validation/    # Validation schemas
│   │   │   ├── formatting/    # Data formatting
│   │   │   ├── constants/     # Shared constants
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api-client/            # HTTP Client for Backend
│       ├── src/
│       │   ├── clients/       # API clients
│       │   ├── types/         # Request/Response types
│       │   ├── hooks/         # React Query hooks
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── infrastructure/            # DevOps and Infrastructure
│   ├── docker/
│   │   ├── docker-compose.yml
│   │   ├── docker-compose.prod.yml
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.admin
│   │   └── Dockerfile.ecommerce
│   ├── terraform/             # Infrastructure as Code
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── k8s/                   # Kubernetes manifests (future)
│   └── scripts/               # Deployment scripts
│       ├── deploy.sh
│       ├── migrate.sh
│       └── backup.sh
│
├── docs/                      # Documentation
│   ├── api/                   # API documentation
│   ├── development/           # Development guides
│   └── *.md                   # Architecture docs
│
├── tools/                     # Development Tools
│   ├── scripts/               # Build and utility scripts
│   │   ├── build-all.sh
│   │   ├── test-all.sh
│   │   ├── lint-all.sh
│   │   └── setup-env.sh
│   └── generators/            # Code generators
│
├── .gitignore                 # Git ignore rules
├── .env.example               # Environment variables template
├── package.json               # Root package.json (workspace config)
├── yarn.lock                  # Lock file
├── tsconfig.json              # Root TypeScript config
├── .eslintrc.js              # ESLint config
├── .prettierrc               # Prettier config
└── README.md                 # Project documentation
```

## Configuração do Workspace

### Root package.json
```json
{
  "name": "saas-ecommerce",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "backend",
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:admin\" \"npm run dev:ecommerce\"",
    "dev:backend": "yarn workspace backend start:dev",
    "dev:admin": "yarn workspace @ecommerce/admin dev",
    "dev:ecommerce": "yarn workspace @ecommerce/store dev",
    "build": "yarn build:packages && yarn build:backend && yarn build:frontend",
    "build:packages": "yarn workspace @ecommerce/types build && yarn workspace @ecommerce/utils build && yarn workspace @ecommerce/ui build && yarn workspace @ecommerce/api-client build",
    "build:backend": "yarn workspace backend build",
    "build:frontend": "yarn workspace @ecommerce/admin build && yarn workspace @ecommerce/store build && yarn workspace @ecommerce/landing build",
    "test": "yarn test:backend && yarn test:frontend",
    "test:backend": "yarn workspace backend test",
    "test:frontend": "yarn workspace @ecommerce/admin test && yarn workspace @ecommerce/store test",
    "lint": "yarn lint:backend && yarn lint:frontend",
    "lint:backend": "yarn workspace backend lint",
    "lint:frontend": "yarn workspace @ecommerce/admin lint && yarn workspace @ecommerce/store lint",
    "db:migrate": "yarn workspace backend prisma migrate deploy",
    "db:seed": "yarn workspace backend prisma db seed",
    "clean": "rm -rf node_modules */node_modules */*/node_modules",
    "setup": "yarn install && yarn build:packages && yarn db:migrate && yarn db:seed"
  },
  "devDependencies": {
    "concurrently": "^8.2.0",
    "prettier": "^3.0.0",
    "eslint": "^8.45.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0"
  }
}
```

### tsconfig.json (Root)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": ".",
    "paths": {
      "@ecommerce/types": ["packages/types/src"],
      "@ecommerce/utils": ["packages/utils/src"],
      "@ecommerce/ui": ["packages/ui/src"],
      "@ecommerce/api-client": ["packages/api-client/src"]
    }
  },
  "references": [
    { "path": "./backend" },
    { "path": "./apps/admin" },
    { "path": "./apps/ecommerce" },
    { "path": "./packages/types" },
    { "path": "./packages/utils" },
    { "path": "./packages/ui" },
    { "path": "./packages/api-client" }
  ]
}
```

## Configuração dos Packages Compartilhados

### packages/types/package.json
```json
{
  "name": "@ecommerce/types",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

### packages/ui/package.json
```json
{
  "name": "@ecommerce/ui",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc && vite build",
    "dev": "vite build --watch"
  },
  "dependencies": {
    "react": "^18.2.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^1.14.0"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^4.4.0",
    "@types/react": "^18.2.0"
  }
}
```

### packages/api-client/package.json
```json
{
  "name": "@ecommerce/api-client",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "@ecommerce/types": "*",
    "@tanstack/react-query": "^4.32.0",
    "axios": "^1.4.0"
  },
  "peerDependencies": {
    "react": "^18.2.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.2.0"
  }
}
```

## Fluxo de Desenvolvimento

### 1. Setup Inicial
```bash
# Clone do repositório
git clone https://github.com/your-org/saas-ecommerce.git
cd saas-ecommerce

# Setup completo (instala dependências, builda packages, roda migrations)
yarn setup

# Iniciar desenvolvimento
yarn dev
```

### 2. Desenvolvimento Local
```bash
# Backend only
yarn dev:backend

# Frontend only
yarn dev:admin
yarn dev:ecommerce

# Tudo junto
yarn dev
```

### 3. Build e Deploy
```bash
# Build de tudo
yarn build

# Testes
yarn test

# Lint
yarn lint

# Deploy para staging
yarn deploy:staging

# Deploy para produção
yarn deploy:production
```

## Versionamento e Releases

### Estratégia de Versionamento
- **Monorepo versionado em conjunto** - Uma tag para toda a aplicação
- **Semantic Versioning** (semver) - v1.2.3
- **Changelog automático** baseado em conventional commits

### Git Workflow
```bash
# Feature branch
git checkout -b feature/new-payment-gateway
git commit -m "feat(payments): add stripe integration"
git push origin feature/new-payment-gateway

# Pull request → merge → automatic deployment
```

### Release Process
```bash
# Automated via GitHub Actions
git tag v1.2.0
git push origin v1.2.0

# Triggers:
# 1. Build de todos os packages
# 2. Testes completos (unit + integration + e2e)
# 3. Deploy para staging
# 4. Testes E2E em staging
# 5. Deploy para produção
# 6. Health checks
```

## Vantagens desta Estrutura

### ✅ **Desenvolvimento**
- **Setup único** - `yarn setup` e está pronto
- **Hot reload** - Mudanças em packages refletem automaticamente
- **Tipos compartilhados** - IntelliSense funciona entre projetos
- **Refactoring seguro** - Mudanças quebram em compile time

### ✅ **CI/CD**
- **Pipeline único** - Um build, um deploy
- **Cache otimizado** - Dependencies compartilhadas
- **Testes coordenados** - Frontend e backend testados juntos
- **Deploy atômico** - Tudo ou nada

### ✅ **Manutenção**
- **Dependências centralizadas** - Atualizações coordenadas
- **Documentação unificada** - Tudo em um lugar
- **Issues tracking** - Bugs e features em um local
- **Code review** - Mudanças full-stack em um PR

Esta estrutura te dá a **simplicidade de um monolito** com a **organização de microserviços**, permitindo evolução gradual conforme o projeto cresce!
