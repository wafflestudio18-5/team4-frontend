import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import History from './components/User/History'
import Me from './components/User/Me'
import Users from './components/User/Users';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/users/me" component={Me}/>
        <Route path="/history" component={History}/>
        <Route exact path="/users" component={Users}/>
      </Switch>
    </Router>
  );
}

export default App;
