import App from "next/app";
import { BaseStyles, theme } from "rimble-ui";
import { ThemeProvider } from "styled-components";
import NProgress from "nprogress";
import Router from "next/router";
import { StoreProvider } from "easy-peasy";
import store from "../model/storeModel";
import MessageContainer from "../components/MessageContainer/MessageContainer";
import "nprogress/nprogress.css";
import "./style.css";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const customTheme = {
  ...theme,
  fonts: {
    serif: "athelas, georgia, times, serif",
    sansSerif: "'Oxygen', sans-serif",
    roboto: "'Roboto Mono', monospace",
  },

  breakpoints: ["36em", "48em", "62em", "75em"],
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <BaseStyles>
        <StoreProvider store={store}>
          <Component {...pageProps} />
          <MessageContainer />
        </StoreProvider>
      </BaseStyles>
    </ThemeProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   // Provide the store to getInitialProps of pages
//   appContext.ctx.store = store;
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default MyApp;
