import { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import store from './store';
import { loadUser } from './action/authAction';
import setAuthToken from './util/setAuthToken';

import Home from './component/layout/Home';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Header from './component/layout/Header';
import Mypage from './component/auth/Mypage';
import About from './component/layout/About';
import Tags from './component/tags/Tags';

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
          <Header />
          <Navbar />
          <Route exact path='/' component={Home} />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/mypage' component={Mypage} />
            <Route exact path='/about' component={About} />
            <Route exact path='/tags' component={Tags} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
