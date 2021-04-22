import React from "react";
import ReactDOM from "react-dom";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./containers/App/index.js";
import { rootReducer } from "./reducers/rootReducer";
import { CookiesProvider } from "react-cookie";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
      <div id="modal"></div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
