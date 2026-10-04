import app from './app.js';
import env from './config/env.js';
import connectDB from './config/db.js';

try {
  await connectDB();
} catch (err) {
  console.error('[db] connection failed:', err.message);
  process.exit(1);
}

app.listen(env.port, () => {
  console.log(`[api] listening on http://localhost:${env.port}`);
});
