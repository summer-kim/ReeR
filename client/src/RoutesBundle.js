import { Route, Switch } from 'react-router-dom';
import './App.css';

import Alert from './component/layout/Alert';

import Login from './component/auth/Login';
import Mypage from './component/auth/Mypage';
import Mypost from './component/auth/Mypost';
import About from './component/layout/About';
import Tags from './component/tags/Tags';
import Mybag from './component/tags/Mybag';
import Mylikes from './component/tags/Mylikes';
import Makepost from './component/tags/Makepost';
import Editpost from './component/tags/Editpost';

import ContentItem from './component/content/ContentItem';

const App = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/mypage' component={Mypage} />
        <Route exact path='/mypost' component={Mypost} />
        <Route exact path='/about' component={About} />
        <Route exact path='/tags' component={Tags} />
        <Route exact path='/mybag' component={Mybag} />
        <Route exact path='/mylikes' component={Mylikes} />
        <Route exact path='/makepost' component={Makepost} />
        <Route exact path='/editpost/:postid' component={Editpost} />
        <Route exact path='/post/:postid' component={ContentItem} />
      </Switch>
    </section>
  );
};

export default App;
