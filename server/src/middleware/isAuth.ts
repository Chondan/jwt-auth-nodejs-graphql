import { verify } from 'jsonwebtoken';
import { MyContext } from '@src/MyContext';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const { req: { headers: { authorization } } } = context;

  if (!authorization) {
    throw new Error('not authenticated');
  }

  try {
    const [, token] = authorization.split(' ');
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    throw new Error('not authenticated');
  }

  return next();
};
