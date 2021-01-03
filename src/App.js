import React, {useState} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import History from './components/User/History'
import Me from './components/User/Me'
import Users from './components/User/Users';
import Main from './components/Main'
import QuestionDetailBox from './components/Questions/QuestionDetailBox'
import {SearchResultUser, SearchResultTags, SearchResultKwds} from './components/SearchResult/SearchResults'
import Header from './components/Banner/Header';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import {AuthContext} from './context/auth'
import User from './components/User/User';
import QuestionAsk from './components/Questions/QuestionAsk'
import Search from './components/SearchResult/Search';

function App() {
  const existingTokens = () => {
    let tokens = {}
    for(let i = 0; i < localStorage.length; i++) {
      tokens[localStorage.key(i)] = localStorage.getItem(localStorage.key(i))
    }
    return tokens
  }
  const [authTokens, setAuthTokens] = useState(existingTokens())
  const setTokens = (tokens) => {
    if(!tokens) {
      localStorage.clear()
    }
    else {
      for(let key in tokens) {
        localStorage.setItem(key, tokens[key])
      }
    }
    setAuthTokens(tokens)
  }
  return (
    <div>
    <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
      <Header/>
      <Switch>
      <Route exact path="/" component={Main}/>
      <Route exact path="/signin" component={Signin}/>
      <Route exact path="/question/ask" component={QuestionAsk}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/search" component={Search}/>
      <Route exact path="/question/:question_id" component={QuestionDetailBox}/>
      <Route exact path="/question/user/:user_id" component={SearchResultUser}/>
      <Route exact path="/question/tagged" component={SearchResultTags}/>
      <Route exact path="/question/kwds" component={SearchResultKwds}/>
      <Route path="/users/me" component={Me}/>
      <Route path="/users/:id" component={User}/>
      <Route exact path="/users" component={Users}/>
      </Switch>
    </AuthContext.Provider>
    </div>
  );
}

export default App;