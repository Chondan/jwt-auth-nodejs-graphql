import { useRegisterMutation } from '@src/graphql/generated/graphql';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  return (
      <div>
          <h1>Register</h1>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const response = await register({
              variables: {
                email,
                password,
              },
            });
            // eslint-disable-next-line no-console
            console.log({ response });

            // Go back to home page
            history.push('/');
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
                  <input type='submit' value='register' />
              </div>
          </form>
      </div>
  );
};

export { Register };
