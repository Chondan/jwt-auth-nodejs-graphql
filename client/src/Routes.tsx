import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import {
  Register, Login, Home, Bye,
} from '@pages/index';

import { Header } from '@components/Header';

// ---- NAV ----
export interface INav {
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
  {
    path: '/bye',
    linkText: 'Bye',
  },

];

// ---- ROUTES ----
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
  {
    path: '/bye',
    component: Bye,
  },
];

const RouteComponent: React.FC = () => (
    <Router>
        <Header nav={nav} />
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
