# Estratégia de Deploy e DevOps

## Arquitetura de Deploy

### Ambientes
```
┌─ Production ─┐    ┌─ Staging ─┐    ┌─ Development ─┐
│              │    │           │    │               │
│ Backend API  │    │ Backend   │    │ Local Backend │
│ Frontend Apps│    │ Frontend  │    │ Local Frontend│
│ Database     │    │ Database  │    │ Local DB      │
│ Redis Cache  │    │ Redis     │    │ Local Redis   │
└──────────────┘    └───────────┘    └───────────────┘
```

### Infraestrutura Recomendada

#### Cloud Provider: AWS
```yaml
# Configuração de infraestrutura
Production:
  Backend:
    - ECS Fargate (Auto Scaling)
    - Application Load Balancer
    - RDS PostgreSQL (Multi-AZ)
    - ElastiCache Redis
    - CloudFront CDN
  
  Frontend:
    - S3 + CloudFront (Admin)
    - S3 + CloudFront (Ecommerce)  
    - S3 + CloudFront (Landing)
  
  Storage:
    - S3 para uploads de imagens
    - CloudFront para CDN
  
  Monitoring:
    - CloudWatch
    - AWS X-Ray
    - Sentry (Error tracking)

Staging:
  - Versões menores dos recursos de produção
  - Banco de dados separado
  - Configurações similares para testes

Development:
  - Docker Compose local
  - PostgreSQL local
  - Redis local
```

## Containerização

### Backend Dockerfile
```dockerfile
# Dockerfile.backend
FROM node:18-alpine AS base

# Install dependencies
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --only=production && npm cache clean --force

# Build stage
FROM base AS build
COPY . .
RUN npm run build
RUN npx prisma generate

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Copy built application
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package*.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3000

CMD ["node", "dist/main"]
```

### Frontend Dockerfiles
```dockerfile
# Dockerfile.admin
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose (Development)
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: 
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/ecommerce
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./src:/app/src
      - ./prisma:/app/prisma

  admin:
    build:
      context: ./apps/admin
      dockerfile: Dockerfile
    ports:
      - "3001:80"
    depends_on:
      - backend

  ecommerce:
    build:
      context: ./apps/ecommerce  
      dockerfile: Dockerfile
    ports:
      - "3002:80"
    depends_on:
      - backend

  landing:
    build:
      context: ./apps/landing
      dockerfile: Dockerfile
    ports:
      - "3003:80"

volumes:
  postgres_data:
```

## CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  AWS_REGION: us-east-1

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: ecommerce_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run database migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/ecommerce_test
      
      - name: Run tests
        run: npm run test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/ecommerce_test
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/ecommerce_test

  build-backend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build and push backend image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: ecommerce-backend
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -f Dockerfile.backend -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest

  build-frontend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    strategy:
      matrix:
        app: [admin, ecommerce, landing]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        working-directory: ./apps/${{ matrix.app }}
        run: npm ci
      
      - name: Build app
        working-directory: ./apps/${{ matrix.app }}
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.PRODUCTION_API_URL }}
      
      - name: Deploy to S3
        run: |
          aws s3 sync ./apps/${{ matrix.app }}/dist s3://ecommerce-${{ matrix.app }}-production --delete
      
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID_${{ matrix.app }} }} --paths "/*"

  deploy-backend:
    needs: [build-backend]
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Update ECS service
        run: |
          aws ecs update-service \
            --cluster ecommerce-cluster \
            --service ecommerce-backend-service \
            --force-new-deployment
      
      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster ecommerce-cluster \
            --services ecommerce-backend-service

  run-migrations:
    needs: [deploy-backend]
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Run database migrations
        run: |
          # Execute migrations via ECS task
          aws ecs run-task \
            --cluster ecommerce-cluster \
            --task-definition ecommerce-migrations \
            --launch-type FARGATE \
            --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

## Configuração de Ambiente

### Environment Variables Management
```bash
# .env.example
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/ecommerce"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="1d"
JWT_REFRESH_EXPIRES_IN="7d"

# AWS (Production)
AWS_REGION="us-east-1"
AWS_S3_BUCKET="ecommerce-uploads"
AWS_CLOUDFRONT_DOMAIN="cdn.yourstore.com"

# Payment Gateways
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
MERCADOPAGO_ACCESS_TOKEN="TEST-..."

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Monitoring
SENTRY_DSN="https://..."
NEW_RELIC_LICENSE_KEY="..."

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CACHE=true
ENABLE_RATE_LIMITING=true
```

### AWS Parameter Store (Production)
```typescript
// config/aws-config.service.ts
import { Injectable } from '@nestjs/common';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

@Injectable()
export class AWSConfigService {
  private ssmClient = new SSMClient({ region: process.env.AWS_REGION });

  async getParameter(name: string, decrypt = true): Promise<string> {
    const command = new GetParameterCommand({
      Name: name,
      WithDecryption: decrypt,
    });

    const result = await this.ssmClient.send(command);
    return result.Parameter?.Value || '';
  }

  async getDatabaseUrl(): Promise<string> {
    return this.getParameter('/ecommerce/database-url');
  }

  async getJWTSecret(): Promise<string> {
    return this.getParameter('/ecommerce/jwt-secret');
  }
}
```

## Monitoramento e Observabilidade

### Health Checks
```typescript
// health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.prisma.pingCheck('database'),
      () => this.checkRedis(),
      () => this.checkS3(),
    ]);
  }

  private async checkRedis() {
    // Redis health check logic
  }

  private async checkS3() {
    // S3 health check logic
  }
}
```

### Logging Configuration
```typescript
// logging/logger.service.ts
import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class CustomLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
          filename: 'logs/error.log', 
          level: 'error' 
        }),
        new winston.transports.File({ 
          filename: 'logs/combined.log' 
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }
}
```

### Metrics and Alerts
```typescript
// metrics/metrics.service.ts
import { Injectable } from '@nestjs/common';
import { Histogram, Counter, register } from 'prom-client';

@Injectable()
export class MetricsService {
  private httpRequestDuration = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
  });

  private orderCounter = new Counter({
    name: 'orders_total',
    help: 'Total number of orders',
    labelNames: ['tenant_id', 'status'],
  });

  recordHttpRequest(method: string, route: string, statusCode: number, duration: number) {
    this.httpRequestDuration
      .labels(method, route, statusCode.toString())
      .observe(duration);
  }

  incrementOrderCount(tenantId: string, status: string) {
    this.orderCounter.labels(tenantId, status).inc();
  }

  getMetrics() {
    return register.metrics();
  }
}
```

## Backup e Disaster Recovery

### Database Backup Strategy
```yaml
# RDS Automated Backups
BackupRetentionPeriod: 7 # days
BackupWindow: "03:00-04:00"
PreferredMaintenanceWindow: "sun:04:00-sun:05:00"

# Point-in-time recovery: Up to 35 days
# Cross-region backup replication for disaster recovery
```

### Application Backup
```bash
#!/bin/bash
# backup-script.sh

# Backup uploaded files from S3
aws s3 sync s3://ecommerce-uploads s3://ecommerce-backups/$(date +%Y%m%d)/uploads

# Create database dump
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
aws s3 cp backup-$(date +%Y%m%d).sql s3://ecommerce-backups/$(date +%Y%m%d)/

# Backup configuration
aws ssm get-parameters-by-path --path "/ecommerce" --recursive > config-backup-$(date +%Y%m%d).json
aws s3 cp config-backup-$(date +%Y%m%d).json s3://ecommerce-backups/$(date +%Y%m%d)/
```

## Scaling Strategy

### Horizontal Scaling
```yaml
# ECS Auto Scaling
ServiceAutoScaling:
  MinCapacity: 2
  MaxCapacity: 10
  TargetCPUUtilization: 70
  TargetMemoryUtilization: 80
  
  ScaleOutCooldown: 300 # seconds
  ScaleInCooldown: 300 # seconds
```

### Database Scaling
```sql
-- Read Replicas para relatórios
-- Particionamento de tabelas por tenant (futuro)
-- Connection pooling com PgBouncer

-- Exemplo de particionamento futuro
CREATE TABLE orders_partition_tenant_1 PARTITION OF orders
FOR VALUES IN ('tenant_1_id');
```

### Cache Strategy
```typescript
// caching/cache.service.ts
@Injectable()
export class CacheService {
  constructor(private redis: Redis) {}

  async cacheProduct(productId: string, product: Product, ttl = 3600) {
    await this.redis.setex(`product:${productId}`, ttl, JSON.stringify(product));
  }

  async getCachedProduct(productId: string): Promise<Product | null> {
    const cached = await this.redis.get(`product:${productId}`);
    return cached ? JSON.parse(cached) : null;
  }

  async invalidateProductCache(productId: string) {
    await this.redis.del(`product:${productId}`);
  }
}
```

Esta estratégia de deploy garante alta disponibilidade, escalabilidade e facilita a manutenção do sistema conforme ele cresce.
