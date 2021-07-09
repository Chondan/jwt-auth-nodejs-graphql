import {
  MeDocument, MeQuery, useLoginMutation,
} from '@src/graphql/generated/graphql';
import { AccessToken } from '@src/util/token';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  const [error, setError] = useState('');

  return (
      <div>
          <h1>Login</h1>
          <form onSubmit={async (e) => {
            e.preventDefault();

            try {
              const response = await login({
                variables: {
                  email,
                  password,
                },
                update: (store, { data }) => {
                  if (!data) return null;

                  return store.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: 'Query',
                      me: data.login.user,
                    },
                  });
                },
              });

              if (response && response.data) {
                AccessToken.set(response.data.login.accessToken);
              }

              // Clear error
              setError('');

              // Go back to home page
              history.push('/');
            } catch (err) {
              setError(err.message);
            }
          }}
          >
              <div>
                  <div>Email</div>
                  <input value={email} type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                  <div>Password</div>
                  <input value={password} type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                  <input type='submit' value='login' />
              </div>
              <div>{error}</div>
          </form>
      </div>
  );
};

export { Login };
