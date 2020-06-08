import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </BrowserRouter>
  </Provider>
);

export default App;
