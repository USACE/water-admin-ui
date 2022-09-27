import Breadcrumb from './breadcrumb';

function Layout({ children }) {
  return <>{children}</>;
}

function Header({ showBreadcrumb = true, children }) {
  return (
    <header style={{ marginTop: 32 }} class='container'>
      <hgroup>
        <h3 style={{ color: 'gray' }}>Water Admin</h3>
        {showBreadcrumb ? <Breadcrumb /> : null}
      </hgroup>
      {children}
    </header>
  );
}

function Footer({ children }) {
  return (
    <footer class='container'>
      <footer>
        <cite> - Minimum Viable Product</cite>
      </footer>
      {children}
    </footer>
  );
}

function Main({ children }) {
  return <main class='container'>{children}</main>;
}

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Main = Main;

export default Layout;
