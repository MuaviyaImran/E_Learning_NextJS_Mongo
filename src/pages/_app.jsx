import "../styles/global.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { Suspense } from 'react';
import store from "../stores/store";
const MyApp = ({ Component, pageProps }) => (
  <SessionProvider session={pageProps.session}>
    <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider></Suspense>
  </SessionProvider>
);

export default MyApp;
