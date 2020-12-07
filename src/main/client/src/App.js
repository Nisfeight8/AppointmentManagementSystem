import './App.css';
import SelectScreen from './components/SelectScreen'
import Dashboard from './components/Dashboard'
import CarrierAdministration from './components/CarrierAdministration'
import CarrierHandled from './components/CarrierHandled'
import CarrierPending from './components/CarrierPending'
import SystemAdministration from './components/SystemAdministration'
import CreateCarrier from './components/CreateCarrier'
import CarrierSubmitted from './components/CarrierSubmitted'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/" exact component={SelectScreen}></Route>
      <Route path="/create/carrier" exact component={CreateCarrier}></Route>
      <Route path="/create/carrier/submitted" exact component={CarrierSubmitted}></Route>
      <Route path="/dashboard" exact component={Dashboard}></Route>
      <Route path="/carrier/:id/employee/:id/appointments/pending" exact component={CarrierPending}/>
      <Route path="/carrier/:id/employee/:id/appointments/handled" exact component={CarrierHandled}/>
      <Route path="/carrier/:id/administration" exact component={CarrierAdministration}/>
      <Route path="/administration" exact component={SystemAdministration}/> 
      </Switch>
    </div>
    </Router>
  );
}

export default App;
