import { Route } from 'react-router-dom'
import Main from './components/Main'
import QuestionDetailBox from './components/Questions/QuestionDetailBox'
import {SearchResultUser, SearchResultTags, SearchResultKwds} from './components/SearchResult/SearchResults'

function App() {
  return (
    <div>
      <Route exact path="/" component={Main}/>
      <Route exact path="/question/:question_id" component={QuestionDetailBox}/>
      <Route exact path="/question/user/:user_id" component={SearchResultUser}/>
      <Route exact path="/question/tagged" component={SearchResultTags}/>
      <Route exact path="/question/kwds" component={SearchResultKwds}/>
    </div>
  );
}

export default App;
