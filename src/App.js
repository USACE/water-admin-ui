import Layout from './app-components/layout.js';
import { useConnect } from 'redux-bundler-hook';

import Login from './app-pages/login.js';

// Primary .scss stylesheet for the application
import './scss/pico-bootstrap-grid.scss';

export default function App() {
  const {
    route: Route,
    pathname,
    authIsLoggedIn: isLoggedIn,
  } = useConnect('selectRoute', 'selectPathname', 'selectAuthIsLoggedIn');

  return !isLoggedIn ? (
    <Layout>
      <Layout.Header showBreadcrumb={false}></Layout.Header>
      <Login />
    </Layout>
  ) : (
    <Layout>
      <Layout.Header showBreadcrumb={pathname !== '/'}></Layout.Header>
      <Layout.Main>
        <Route />
      </Layout.Main>
      <Layout.Footer />
    </Layout>
  );
}
