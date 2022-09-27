import Layout from './app-components/layout.js';
import { useConnect } from 'redux-bundler-hook';

import Login from './app-pages/login.js';

export default function App() {
  const { route: Route, authIsLoggedIn: isLoggedIn } = useConnect(
    'selectRoute',
    'selectAuthIsLoggedIn'
  );

  return !isLoggedIn ? (
    <Layout>
      <Layout.Header showBreadcrumb={false}></Layout.Header>
      <Login />
    </Layout>
  ) : (
    <Layout>
      <Layout.Header showBreadcrumb={true}></Layout.Header>
      <Layout.Main>
        <Route />
      </Layout.Main>
      <Layout.Footer />
    </Layout>
  );
}
