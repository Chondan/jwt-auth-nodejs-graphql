import React, { useState, useEffect } from 'react';

import { AccessToken, getRefreshTokenEndpoint } from '@src/util/token';
import { RouteComponent } from './Routes';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getRefreshTokenEndpoint(), {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (res) => {
        const { accessToken } = await res.json();

        AccessToken.set(accessToken);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <RouteComponent />;
};

export { App };
