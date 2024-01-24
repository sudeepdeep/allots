import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";

function Helmet({ appTitle = false, description = false, favicon = false }) {
  return (
    <ReactHelmet htmlAttributes={{ lang: "en" }}>
      <title>{appTitle}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href={favicon} />
      <link rel="apple-touch-icon" href={favicon} />
    </ReactHelmet>
  );
}

export default Helmet;
