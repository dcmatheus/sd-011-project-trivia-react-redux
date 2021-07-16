import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Setup from './pages/Setup';

export default function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route exact path="/" render={ () => <Login /> } /> */}
        <Route exact path="/"><Login /></Route>
        <Route exact path="/Setup"><Setup /></Route>
      </Switch>
    </div>
  );
}
