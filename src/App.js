import './App.css'
import {Route, Switch} from 'react-router-dom'
import Home from '../Home'
import TeamMatches from '../TeamMatches'
import NotFound from '../NotFound'
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/team-matches/:id" component={TeamMatches} />
    <Route component={NotFound} />
  </Switch>
)

export default App
