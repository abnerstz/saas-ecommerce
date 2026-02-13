import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Server
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),

  // Database
  DATABASE_URL: Joi.string().required(),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('30d'),

  // Redis (optional)
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().optional(),

  // Mail (optional)
  MAIL_HOST: Joi.string().optional(),
  MAIL_PORT: Joi.number().default(587),
  MAIL_USER: Joi.string().optional(),
  MAIL_PASSWORD: Joi.string().optional(),
  MAIL_FROM: Joi.string().email().optional(),

  // Upload
  MAX_FILE_SIZE: Joi.number().default(5242880), // 5MB

  // AWS (optional)
  AWS_REGION: Joi.string().default('us-east-1'),
  AWS_ACCESS_KEY_ID: Joi.string().optional(),
  AWS_SECRET_ACCESS_KEY: Joi.string().optional(),
  AWS_S3_BUCKET: Joi.string().optional(),

  // Payment Gateways (optional)
  STRIPE_PUBLIC_KEY: Joi.string().optional(),
  STRIPE_SECRET_KEY: Joi.string().optional(),
  STRIPE_WEBHOOK_SECRET: Joi.string().optional(),

  MERCADO_PAGO_ACCESS_TOKEN: Joi.string().optional(),
  MERCADO_PAGO_PUBLIC_KEY: Joi.string().optional(),

  // URLs
  FRONTEND_URL: Joi.string().uri().default('http://localhost:3002'),
  ADMIN_URL: Joi.string().uri().default('http://localhost:3001'),
  LANDING_URL: Joi.string().uri().default('http://localhost:3003'),

  // Security
  SALT_ROUNDS: Joi.number().default(12),
  RATE_LIMIT_TTL: Joi.number().default(60000),
  RATE_LIMIT_MAX: Joi.number().default(100),

  // Features
  ENABLE_SIGNUP: Joi.string().default('true'),
  ENABLE_EMAIL_VERIFICATION: Joi.string().default('true'),
  ENABLE_PASSWORD_RESET: Joi.string().default('true'),
  ENABLE_FILE_UPLOAD: Joi.string().default('true'),
  ENABLE_CACHE: Joi.string().default('true'),
});
