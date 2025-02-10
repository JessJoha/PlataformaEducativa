const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("ERROR: JWT_SECRET no está definido en .env");
}

const JWT_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || '3600';

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION, algorithm: "HS256" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

module.exports = { generateToken, verifyToken };