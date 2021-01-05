import React, {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import Me from './components/User/Me'
import Users from './components/User/Users';
import Main from './components/Main'
import QuestionDetailBox from './components/Questions/QuestionDetailBox'
import {SearchResultUser, SearchResultTags, SearchResultKeywords} from './components/SearchResult/SearchResults'
import Header from './components/Banner/Header';

import {useSelector, useDispatch} from 'react-redux' 
import {Signin} from './components/Auth/Signin'
import QuestionAsk from './components/Questions/QuestionAsk'
import Signup from './components/Auth/Signup';
import {AuthContext} from './context/auth'
import User from './components/User/User';
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

  const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
  const token = useSelector(state => state.userInfoReducer.token)

  console.log("isLogged?");
  console.log(isLoggedin);

  return (
    <div>
    <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
      <Header/>
      <Switch>
      <Route exact path="/" component={Main}/>
      <Route exact path="/signin" component={Signin}/>
      <Route exact path="/question/ask" component={QuestionAsk}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/question/keywords" component={SearchResultKeywords}/>
      <Route exact path="/search" component={Search}/>
      <Route exact path="/question/user/:user_id" component={SearchResultUser}/>
      <Route exact path="/question/tagged" component={SearchResultTags}/>
      <Route exact path="/question/:question_id" component={QuestionDetailBox}/>
      <Route path="/users/me" component={Me}/>
      <Route path="/users/:id" component={User}/>
      <Route exact path="/users" component={Users}/>
      </Switch>
    </AuthContext.Provider>
    </div>
  );
}

export default App;