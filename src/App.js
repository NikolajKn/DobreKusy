import './App.css';
import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./components/home/Home"
import Menu from "./components/menu/Menu"

function App() {

  return (
    <BrowserRouter>
    <Switch>
      <Route path = "/" exact component={Home}/>
      <Route path = "/menu" exact component={Menu}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
