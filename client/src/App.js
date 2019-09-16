import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register';
// Redux
import { Provider } from 'react-redux';
import store from './store';



import './App.css';

const App = () =>
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
export default App;
