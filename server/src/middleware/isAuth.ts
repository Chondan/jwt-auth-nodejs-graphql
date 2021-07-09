import { MyContext } from '@src/util/MyContext';
import { MiddlewareFn } from 'type-graphql';
import { parseTokenFromHeaders } from '@src/util/token';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const { req } = context;
  const { error, msg, payload } = parseTokenFromHeaders({ req });

  if (error) {
    throw new Error(msg);
  }

  context.payload = payload as any;

  return next();
};
