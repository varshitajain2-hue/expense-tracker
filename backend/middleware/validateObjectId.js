import mongoose from 'mongoose';

/**
 * Middleware to validate whether an :id route parameter is a valid MongoDB ObjectId
 */
export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid ID format: "${id}". Must be a 24-character hexadecimal string.`,
    });
  }
  next();
};
