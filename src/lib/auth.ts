import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { randomBytes } from 'crypto';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateSecureToken = (): string => {
  return randomBytes(32).toString('hex');
};

export const generateJWT = (payload: string | object, expiresIn: string = '1h'): string => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-for-development';
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyJWT = (token: string): string | JwtPayload => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-for-development';
  return jwt.verify(token, secret);
};

export const generateTwoFactorSecret = (): string => {
  return randomBytes(16).toString('hex');
};

export const generateOTP = (length: number = 6): string => {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
};
