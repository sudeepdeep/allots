import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import "react-toastify/dist/ReactToastify.css";
import Helmet from "./components/Helmet";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ToastContainer />
    <Helmet
      appTitle="SNAPNEWS"
      favicon={
        "https://firebasestorage.googleapis.com/v0/b/woid-582b2.appspot.com/o/snapnews.png?alt=media&token=ecf9f9ce-cc18-4035-8f44-ba7339640204"
      }
    />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);
