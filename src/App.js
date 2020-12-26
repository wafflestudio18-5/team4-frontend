<<<<<<< Updated upstream
=======
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
import Header, { Header2 } from './components/Banner/Header';
>>>>>>> Stashed changes

function App() {
  return (
    <div>
<<<<<<< Updated upstream
      Hello World
=======
    <Router>
      <Header/>
      <Switch>
      <Route exact path="/" component={Main}/>
      <Route exact path="/question/:question_id" component={QuestionDetailBox}/>
      <Route exact path="/question/user/:user_id" component={SearchResultUser}/>
      <Route exact path="/question/tagged" component={SearchResultTags}/>
      <Route exact path="/question/kwds" component={SearchResultKwds}/>
      <Route path="/users/me" component={Me}/>
      <Route path="/history" component={History}/>
      <Route exact path="/users" component={Users}/>
      </Switch>
    </Router>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
