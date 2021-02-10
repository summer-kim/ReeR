import { Route, Switch } from 'react-router-dom';

import Alert from './component/template/Alert';
import Login from './component/auth/Login';
import Mypage from './component/auth/Mypage';
import About from './component/layout/About';
import Contents from './component/content/Contents';
import Makepost from './component/posting/Makepost';

import ContentItem from './component/content/ContentItem';

const App = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/mypage' component={Mypage} />
        <Route exact path='/contents/:type' component={Contents} />
        <Route exact path='/post/:postid' component={ContentItem} />
        <Route exact path='/about' component={About} />
        <Route exact path='/makepost/:postid' component={Makepost} />
      </Switch>
    </section>
  );
};

export default App;
