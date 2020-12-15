import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import store from './store';
import { Helmet } from 'react-helmet';

import Home from './component/layout/Home';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Helmet>
            <meta charset='UTF-8' />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1.0'
            />
            <title>ReeR: We got your back:)</title>
            <link
              rel='stylesheet'
              href='https://use.fontawesome.com/releases/v5.15.1/css/all.css'
              integrity='sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp'
              crossorigin='anonymous'
            />
            <link rel='icon' href='./img/favicon.png' />
            <link rel='preconnect' href='https://fonts.gstatic.com' />
            <link
              href='https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500;600&family=Pacifico&display=swap'
              rel='stylesheet'
            />
          </Helmet>
          <Route exact path='/' component={Home} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
