import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from '@src/grqphql/resolvers/UserResolver';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import cors from 'cors';
import { User } from './entity/User';
import { createAccessToken, createRefreshToken, sendRefreshToken } from './util/auth';

(async () => {
  const app = express();

  // Setup middleware
  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

  // Routes
  app.get('/', (_req, res) => res.send('Hello World'));
  app.post('/refresh_token', async (req, res) => {
    const { jid: token } = req.cookies;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.send({ ok: false, accessToken: '' });
    }

    // token is valid and we can send back an access token
    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    // Check tokenVersion
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    // Update refresh token
    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  // Start typeorm connection
  await createConnection();

  // Setup apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });

  // eslint-disable-next-line no-console
  const PORT = 3001;
  app.listen(PORT, () => console.log(`Server started: Listening at port ${PORT}`));
})();
