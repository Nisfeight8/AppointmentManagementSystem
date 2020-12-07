import Signup from './components/Signup'
import SelectScreen from './components/SelectScreen'
import Dashboard from './components/Dashboard'
import NewAppointment from './components/NewAppointment'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/" exact component={SelectScreen}></Route>
      <Route path="/register" exact component={Signup}></Route>
      <Route path="/dashboard" exact component={Dashboard}></Route>
      <Route path="/create/appointment" exact component={NewAppointment}></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
