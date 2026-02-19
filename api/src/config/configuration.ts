export const configuration = () => ({
  // Server
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  database: {
    url: process.env.DATABASE_URL,
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'super-secret-jwt-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret:
      process.env.JWT_REFRESH_SECRET || 'super-secret-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },

  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
  },

  // Mail
  mail: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10) || 587,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM || 'noreply@saas-ecommerce.com',
  },

  // Upload
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'application/pdf',
    ],
  },

  // AWS S3
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.AWS_S3_BUCKET,
  },

  // Payment Gateways
  stripe: {
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },

  mercadoPago: {
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    publicKey: process.env.MERCADO_PAGO_PUBLIC_KEY,
  },

  // External URLs
  urls: {
    frontend: process.env.FRONTEND_URL || 'http://localhost:3002',
    admin: process.env.ADMIN_URL || 'http://localhost:3001',
    landing: process.env.LANDING_URL || 'http://localhost:3003',
  },

  // Security
  security: {
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 12,
    rateLimitTtl: parseInt(process.env.RATE_LIMIT_TTL, 10) || 60000,
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
  },

  // Features
  features: {
    enableSignup: process.env.ENABLE_SIGNUP !== 'false',
    enableEmailVerification: process.env.ENABLE_EMAIL_VERIFICATION !== 'false',
    enablePasswordReset: process.env.ENABLE_PASSWORD_RESET !== 'false',
    enableFileUpload: process.env.ENABLE_FILE_UPLOAD !== 'false',
    enableCache: process.env.ENABLE_CACHE !== 'false',
  },
});
