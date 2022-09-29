import Layout from './app-components/layout.js';
import { useConnect } from 'redux-bundler-hook';
import './app.css';

import Login from './app-pages/login.js';

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
