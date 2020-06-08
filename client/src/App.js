import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
  // set global token header if there is a token
  setAuthToken(localStorage.token);
}

const App = () => {
  // did mount
  useEffect(() => {
    // need to use store.dispatch here because Provider is
    // same level with App, can't use connect from react-redux
    store.dispatch(loadUser());
  }, []); // [] makes useEffect only run once

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
