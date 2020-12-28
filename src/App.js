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
import {Error404} from './components/Error'
import Header from './components/Banner/Header';

function App() {
  return (
    <div>
    <Router>
      <Header/>
      <Switch>
      <Route exact path="/" component={Main}/>
      <Route exact path="/question/user/:user_id" component={SearchResultUser}/>
      <Route exact path="/question/tagged" component={SearchResultTags}/>
      <Route exact path="/question/kwds" component={SearchResultKwds}/>
      <Route exact path="/question/:question_id" component={QuestionDetailBox}/>
      <Route exact path="/error/404" component={Error404}/>
      <Route path="/users/me" component={Me}/>
      <Route path="/history" component={History}/>
      <Route exact path="/users" component={Users}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
