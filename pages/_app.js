import "@/styles/globals.css";
import Header from "@/components/Header";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { Provider } from "react-redux";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import accounts from "@/pages/reducer/accounts";
import pagination from "./reducer/pagination";

const reducers = combineReducers({ accounts, pagination });
const persistConfig = { key: "newsWebsite", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  // check and reset theme when `darkMode` changes
  useEffect(() => {
    themeCheck();
  }, [darkMode]);

  // check theme on component mount
  useEffect(() => {
    themeCheck();
  }, []);

  // check and reset theme
  const themeCheck = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  };
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Component {...pageProps} style={{ width: "100%" }} />
        </PersistGate>
      </Provider>
    </>
  );
}
