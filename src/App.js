import { Route } from 'react-router-dom'
import Main from './components/Main'


function App() {
  return (
    <div>
      <Route exact path="/" component={Main}/>
    </div>
  );
}

export default App;
