import { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import store from './redux/store';
import { loadUser } from './redux/action/authAction';
import setAuthToken from './util/setAuthToken';

import Home from './component/layout/Home';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Routes from './Routes';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route component={Routes} />
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
