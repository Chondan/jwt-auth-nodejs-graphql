import React from 'react';
import {
  BrowserRouter as Router, Route, Link, Switch,
} from 'react-router-dom';

import { Register, Login, Home } from '@pages/index';

// Nav
interface INav {
    path: string;
    linkText: string;
}
const nav: INav[] = [
  {
    path: '/',
    linkText: 'Home',
  },
  {
    path: '/register',
    linkText: 'Register',
  },
  {
    path: '/login',
    linkText: 'Login',
  },

];

// Routes
interface IRoute {
    path: string;
    component: React.ReactNode;
}
const routes: IRoute[] = [
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Home,
  },
];

const RouteComponent: React.FC = () => (
    <Router>
        <header className='nav'>
            {nav.map((n) => {
              const { path, linkText } = n;
              return <Link key={Math.random().toString(36)} to={path}>{linkText}</Link>;
            })}
        </header>
        <Switch>
            {routes.map((route) => {
              const { path, component } = route;
              const RenderComponent = component as any;
              return (
                  <Route key={Math.random().toString(36)} path={path} exact component={RenderComponent} />
              );
            })}
        </Switch>
    </Router>
);

export { RouteComponent };
