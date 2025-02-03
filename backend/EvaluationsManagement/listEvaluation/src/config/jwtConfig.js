const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || '3600';

const generateToken = (userId) => {
  const payload = { userId };
  const options = { expiresIn: JWT_EXPIRATION };
  return jwt.sign(payload, JWT_SECRET, options);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { generateToken, verifyToken };
