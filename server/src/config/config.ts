import cors from 'cors';

export const env = {
  PORT: Number(process.env.PORT) || 3003,
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'cookie_secret_example',
  CLIENT_URL: process.env.CLIENT_URL || 'your_client_url',
};

const ALLOWED_ORIGINS = [`http://localhost:5173`, env.CLIENT_URL];

export const corsOptions: cors.CorsOptions = {
  origin: ALLOWED_ORIGINS,
  credentials: true,
};
