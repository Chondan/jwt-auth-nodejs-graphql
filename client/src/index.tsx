import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { AccessToken, getRefreshTokenEndpoint } from '@src/util/token';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { App } from './App';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = AccessToken.get();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${AccessToken.get()}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // eslint-disable-next-line no-console
  console.error({ graphQLErrors, networkError });
});

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = AccessToken.get();

    if (!token) return true;

    try {
      return !AccessToken.isExpired(token);
    } catch (err) {
      return false;
    }
  },
  fetchAccessToken: () => fetch(getRefreshTokenEndpoint(), {
    method: 'POST',
    credentials: 'include',
  }),
  handleFetch: (accessToken) => {
    // eslint-disable-next-line no-console
    console.log('fetched new access token');
    AccessToken.set(accessToken);
  },
  handleError: (err) => {
    // eslint-disable-next-line no-console
    console.warn('Your refresh token is invalid. Try to relogin');
    // eslint-disable-next-line no-console
    // console.error(err);

    // your custom action here e.g. user.logout()
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  link: ApolloLink.from([
    tokenRefreshLink as any,
    errorLink,
    authLink,
    httpLink,
  ]),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
