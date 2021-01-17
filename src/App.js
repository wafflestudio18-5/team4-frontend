import { Route, Switch, BrowserRouter } from "react-router-dom";

import { useSelector } from "react-redux";

import Me from "./components/User/Me";
import Users from "./components/User/Users";
import Main from "./components/Main";
import QuestionDetailBox from "./components/Questions/QuestionDetailBox";
import {
  SearchResultUser,
  SearchResultTags,
  SearchResultKeywords,
} from "./components/SearchResult/SearchResults";
import Header from "./components/Banner/Header";
import { Signin } from "./components/Auth/Signin";
import QuestionAsk from "./components/Questions/QuestionAsk";
import Signup from "./components/Auth/Signup";
import User from "./components/User/User";
import Search from "./components/SearchResult/Search";
import QuestionEdit from "./components/Questions/QuestionEdit";

function App() {
  const isLoggedin = useSelector((state) => state.isLoggedReducer.loggedin);
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/question/ask" component={QuestionAsk} />
        <Route exact path="/signup" component={Signup} />
        <Route
          exact
          path="/question/keywords"
          component={SearchResultKeywords}
        />
        <Route exact path="/search" component={Search} />
        <Route
          exact
          path="/question/user/:user_id"
          component={SearchResultUser}
        />
        <Route
          exact
          path="/question/edit/:question_id"
          component={QuestionEdit}
        />
        <Route exact path="/question/tagged" component={SearchResultTags} />
        <Route
          exact
          path="/question/:question_id"
          component={QuestionDetailBox}
        />
        <Route path="/users/me" component={Me} />
        <Route path="/users/:id" component={User} />
        <Route exact path="/users" component={Users} />
      </Switch>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
