import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const style = {
    margin: "0 !important",
    padding: "0 !important",
  };

  return (
    <Html lang="en">
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width "
        />
        {/* Keeps banner at full width all the time */}
        <style>
          {`
            #__next { width: 100% }
          `}
        </style>
      </Head>
      <body style={style}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
