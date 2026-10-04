import env from '../config/env.js';

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Malformed JSON body.' });
  }
  if (err.name === 'ValidationError') {
    const errors = Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v.message]));
    return res.status(422).json({ success: false, message: 'Please correct the highlighted fields.', errors });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid id.' });
  }

  console.error('[error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: env.isProd ? 'Something went wrong. Please try again.' : err.message,
  });
}
