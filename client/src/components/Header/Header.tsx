import { Link } from 'react-router-dom';
import {
  useLogoutMutation, useMeQuery,
} from '@src/graphql/generated/graphql';
import { INav } from '@src/Routes';
import { AccessToken } from '@src/util/token';
import React, { useCallback } from 'react';

import styles from './Header.module.scss';

interface IHeader {
    nav: INav[];
}
const Header: React.FC<IHeader> = (props) => {
  const { nav } = props;
  const { data, loading } = useMeQuery({ fetchPolicy: 'cache-and-network' });
  const [logout, { client }] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      AccessToken.set('');
      await client.resetStore();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.message);
    }
  }, [client, logout]);

  let body: any;
  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = (
        <div>
            You are logged in as:
            {' '}
            {data.me.email}
        </div>
    );
  } else {
    body = <div>Not logged in</div>;
  }

  return (
      <header className={styles.nav}>
          {nav.map((n) => {
            const { path, linkText } = n;
            return <Link key={Math.random().toString(36)} to={path}>{linkText}</Link>;
          })}
          {body}
          {!loading && data && data.me ? <button onClick={handleLogout}>Log out</button> : null}
      </header>
  );
};

export { Header };
