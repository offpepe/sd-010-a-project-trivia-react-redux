import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Settings from './pages/Settings';
import GameScreen from './pages/GameScreen';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/"><Login /></Route>
      <Route path="/game"><GameScreen /></Route>
      <Route path="/configuracoes"><Settings /></Route>
      <Route path="/feedback"><Feedback /></Route>
      <Route path="/ranking"><Ranking /></Route>
    </Switch>
  );
}

export default App;
