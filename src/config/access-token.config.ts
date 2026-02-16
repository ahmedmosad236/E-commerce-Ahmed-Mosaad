// src/configs/jwt/access-token.config.ts
import { registerAs } from '@nestjs/config';

export type AccessTokenConfig = {
  secret?: string;
  expiresIn?: string;
};

export default registerAs('jwt-access', () => ({
  secret: process.env.JWT_ACCESS_SECRET,
  expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
}));