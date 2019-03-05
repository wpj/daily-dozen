import React, { FunctionComponent, HTMLProps, ReactNode } from 'react';

interface Props {
  body: string;
  bodyAttributes: HTMLProps<HTMLBodyElement>;
  headComponents: ReactNode;
  htmlAttributes: HTMLProps<HTMLHtmlElement>;
  preBodyComponents: ReactNode;
  postBodyComponents: ReactNode;
}

const HTML: FunctionComponent<Props> = ({
  body,
  bodyAttributes,
  headComponents,
  htmlAttributes,
  preBodyComponents,
  postBodyComponents,
}) => {
  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {headComponents}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
      </body>
    </html>
  );
};

export default HTML;
