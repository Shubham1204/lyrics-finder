import React from 'react';
import Header from './components/layout/Header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from './components/layout/Index';
import './App.css';
import {Provider} from './context';
import Lyrics from './components/track/Lyrics';


function App() {
  return (
    <Provider>
    <Router>
    <div className="App">
      <Header />
      <div className="container">
        <Switch>
  <Route exact path="/" component={Index} />
  <Route exact path="/lyrics/track/:id" component={Lyrics} />
        </Switch>
      </div>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
