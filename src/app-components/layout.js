import ConditionalWrapper from '../utils/conditional-wrapper';
import Breadcrumb from './breadcrumb';
import Modal from './modal';

function Layout({ children }) {
  return (
    <>
      <Modal />
      {children}
    </>
  );
}

function Header({ showBreadcrumb = true, children }) {
  return (
    <header style={{ marginTop: 32 }} class='container'>
      <ConditionalWrapper
        condition={showBreadcrumb}
        wrapper={(children) => <hgroup>{children}</hgroup>}
      >
        <h3 style={{ color: 'gray' }}>Water Admin</h3>
        {showBreadcrumb && <Breadcrumb />}
      </ConditionalWrapper>
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
