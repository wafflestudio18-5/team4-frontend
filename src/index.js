import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import App from "./App";
import reducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

// redux-dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// for async functions. use react-thunk
const store = createStore(
  persistReducer(persistConfig, reducer),
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
