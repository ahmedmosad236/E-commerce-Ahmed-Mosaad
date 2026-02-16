// src/configs/jwt/refresh-token.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('jwt-refresh', () => ({
  secret: process.env.JWT_REFRESH_SECRET,
  expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ,
  
}));