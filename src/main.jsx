import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

import App from "./app/App";
import "./index.css";
import { store } from "./app/store";

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
