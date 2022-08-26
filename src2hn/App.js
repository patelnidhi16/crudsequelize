import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'assets/scss/custom.scss';
import Layout from './layouts/Layout';
import { Provider } from 'react-redux'
import store from './store'
import * as action from './store/actions'

const App = () => {

  store.dispatch(action.authCheck());
  return (
    <Provider store={store}>

      <Router >
        <Layout />
      </Router>
    </Provider>
  );
};

export default App;
