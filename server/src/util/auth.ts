import { sign } from 'jsonwebtoken';
import { User } from '@src/entity/User';

export const createAccessToken = (user: User) => {
  const { ACCESS_TOKEN_SECRET } = process.env;
  const payload = { userId: user.id };
  return sign(payload, ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (user: User) => {
  const { REFRESH_TOKEN_SECRET } = process.env;
  const payload = { userId: user.id };
  return sign(payload, REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  });
};
