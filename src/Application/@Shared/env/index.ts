import { z } from 'zod';

export const envSchema = z.object({
  // JWT
  JWT_SECRET: z.string(),

  // POSTGRES
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z
    .string()
    .refine((val) => !isNaN(parseInt(val, 10)), {
      message: 'POSTGRES_PORT must be a valid number',
    })
    .transform((val) => parseInt(val, 10)),

  // REDIS
  REDIS_HOST: z.string(),
  REDIS_PORT: z
    .string()
    .refine((val) => !isNaN(parseInt(val, 10)), {
      message: 'POSTGRES_PORT must be a valid number',
    })
    .transform((val) => parseInt(val, 10)),
  REDIS_PASSWORD: z.string(),
});

export const ENV = envSchema.parse(process.env);
