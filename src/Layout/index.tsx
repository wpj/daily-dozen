import cc from 'classcat';
import {
  graphql,
  useStaticQuery,
  Link as GatsbyLink,
  GatsbyLinkProps,
} from 'gatsby';
import React, { FunctionComponent } from 'react';
import Helmet from 'react-helmet';

import { Provider as OptionsProvider } from '../UserOptions';

import '../styles/style.css';

const Main: FunctionComponent = props => {
  return <main className="center mw6-ns" {...props} />;
};

const NavLink: FunctionComponent<GatsbyLinkProps<{ to: string }>> = ({
  children,
  className,
  to,
}) => {
  return (
    <GatsbyLink
      to={to}
      activeClassName="gradient-border-bottom"
      className={cc(['db navy ma3 no-underline link', className])}
    >
      {children}
    </GatsbyLink>
  );
};

const Nav = ({ title }: { title: string }) => {
  return (
    <nav className="bg-light-green">
      <ul role="navigation" className="list pl0 ma0 flex justify-between">
        <li>
          <NavLink to="/" className="fw9 f4-ns f5 sans-serif tracked-mega">
            {title}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className="f4-ns f5 fw5 normal sans-serif tracked-tight"
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export const Layout: FunctionComponent = ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `,
  );

  const { title, description } = site.siteMetadata;

  return (
    <OptionsProvider>
      <Helmet title={title}>
        <html lang="en" />
        <meta name="description" content={description} />
      </Helmet>
      <Nav title={title} />
      <Main>{children}</Main>
    </OptionsProvider>
  );
};
