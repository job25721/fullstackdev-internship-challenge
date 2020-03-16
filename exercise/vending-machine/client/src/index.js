import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import 'sweetalert2/src/sweetalert2.scss'
import './css/app.css'

import { Provider } from "react-redux";
import store from './redux/store'

import { Switch, BrowserRouter, Route } from "react-router-dom";

import Index from './pages/index'


const AppRouter = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<AppRouter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
