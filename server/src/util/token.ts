import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
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
  const payload = { userId: user.id, tokenVersion: user.tokenVersion };
  return sign(payload, REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  });
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, { httpOnly: true, path: '/refresh_token' });
};

export const parseTokenFromHeaders = ({ req }: {req: Request}) => {
  const { headers: { authorization } } = req;

  if (!authorization) {
    return { error: true, msg: 'Not authenticated parseTokenFromHeaders', payload: {} };
  }

  try {
    const [, token] = authorization.split(' ');
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return { error: false, msg: 'Token is valid', payload };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return { error: true, msg: err.message, payload: {} };
  }
};
