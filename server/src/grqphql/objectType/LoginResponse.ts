import { ObjectType, Field } from 'type-graphql';
import { User } from '@src/entity/User';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user?: User;
}
