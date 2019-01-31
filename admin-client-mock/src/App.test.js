import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {createStore} from "redux";
import reducer from "./services/reducers";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

const store = createStore(reducer);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
