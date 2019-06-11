import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Container from './components/UI/Container'

const App = () => (
  
  <Router>
    <NavBar />
    <Route exact path="/" component={Landing} />
    <Container>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </Container>
  </Router>
  
);

export default App;
