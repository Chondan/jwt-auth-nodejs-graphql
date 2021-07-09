import { useByeQuery } from '@src/graphql/generated/graphql';
import React from 'react';

const Bye: React.FC = () => {
  const { data, loading, error } = useByeQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return <div>Err</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
      <div>
          <div>{data.bye}</div>
      </div>
  );
};

export { Bye };
