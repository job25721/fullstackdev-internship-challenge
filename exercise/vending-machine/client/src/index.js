import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import 'sweetalert2/src/sweetalert2.scss'
import './css/app.css'

import { Provider } from "react-redux";
import store from './redux/store'
import App from './pages/index'

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
