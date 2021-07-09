import {
  Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware,
} from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import {
  createAccessToken, createRefreshToken, parseTokenFromHeaders, sendRefreshToken,
} from '@src/util/token';
import { MyContext } from '@src/util/MyContext';
import { User } from '@src/entity/User';
import { LoginResponse } from '@src/grqphql/objectType/LoginResponse';
import { isAuth } from '@src/middleware/isAuth';
import { getConnection } from 'typeorm';

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hello world';
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  me(
    @Ctx() { req }: MyContext,
  ) {
    const { payload } = parseTokenFromHeaders({ req });
    const { userId } = payload as any;
    return User.findOne(userId);
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(
    @Arg('userId', () => Int) userId: number,
  ) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1);

    return true;
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(
    @Ctx() { payload }: MyContext,
  ) {
    return `your user id is: ${payload!.userId}`;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext,
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Could not find user!');
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error('bad password!');
    }

    // login successful
    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(
    @Ctx() { res }: MyContext,
  ) {
    sendRefreshToken(res, '');
    return true;
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (err) {
    // eslint-disable-next-line no-console
      console.error(err);
      return false;
    }
    return true;
  }
}
