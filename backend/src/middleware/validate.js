/** Runs a validator ({ errors, data }) and replaces req.body with clean data. */
export const validate = (validator) => (req, res, next) => {
  const { errors, data } = validator(req.body);
  if (Object.keys(errors).length) {
    return res
      .status(422)
      .json({ success: false, message: 'Please correct the highlighted fields.', errors });
  }
  req.body = data;
  next();
};

export default validate;
