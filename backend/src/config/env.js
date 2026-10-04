/** Runtime configuration, read once from the environment. */
export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/satpuda_iti',
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  adminPassword: process.env.ADMIN_PASSWORD || '',
  tokenSecret: process.env.TOKEN_SECRET || '',
  tokenTtlHours: Number(process.env.TOKEN_TTL_HOURS) || 12,
  isProd: process.env.NODE_ENV === 'production',
};

export default env;
