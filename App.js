import React from "react";
import Router from "./src/navigation/router";

import { Provider } from "react-redux";
import store from "./src/store/config/config";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
