import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import History from './components/User/History'
import Me from './components/User/Me'
import Users from './components/User/Users';
import Main from './components/Main'
import QuestionDetailBox from './components/Questions/QuestionDetailBox'
import {SearchResultUser, SearchResultTags, SearchResultKwds} from './components/SearchResult/SearchResults'
import Header from './components/Banner/Header';
<<<<<<< Updated upstream

=======
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import {AuthContext} from './context/auth'
import { Config } from './axios';
import User from './components/User/User';
>>>>>>> Stashed changes
function App() {
  return (
    <div>
    <Router>
      <Header/>
      <Switch>
      <Route exact path="/" component={Main}/>
      <Route exact path="/question/:question_id" component={QuestionDetailBox}/>
      <Route exact path="/question/user/:user_id" component={SearchResultUser}/>
      <Route exact path="/question/tagged" component={SearchResultTags}/>
      <Route exact path="/question/kwds" component={SearchResultKwds}/>
      <Route path="/users/me" component={Me}/>
<<<<<<< Updated upstream
      <Route path="/history" component={History}/>
=======
      :<Redirect to="/"/>}

      <Route path="/users/:id" component={User}/>
>>>>>>> Stashed changes
      <Route exact path="/users" component={Users}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
