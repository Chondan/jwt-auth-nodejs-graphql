import { useUsersQuery } from '@src/graphql/generated/graphql';
import React from 'react';

interface IHome {}

const Home: React.FC<IHome> = () => {
  const { data } = useUsersQuery({ fetchPolicy: 'network-only' }); // It's not gonna read from the cache

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
      <div>
          <br />
          <div>Users:</div>
          <ul>
              {data.users.map((user) => {
                const { id, email } = user;
                return <li key={Math.random().toString(36)}>{`${id}: ${email}`}</li>;
              })}
          </ul>
      </div>
  );
};

export { Home };
