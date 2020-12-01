import './App.css';
import React from "react";
import './components/menu/Menu.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./components/home/Home"
import Menu from "./components/menu/Menu"
import MenuDetail from "./components/menu/MenuDetail"
import StorageBoard from "./components/storage/StorageBoard"
import MenuDialog from "./components/menu-dialog/MenuDialog"

function App() {

  return (
    <BrowserRouter>
    <Switch>
      <Route path = "/" exact component={Home}/>
      <Route path = "/menu" exact component={Menu}/>
      <Route path = "/detail" exact component={MenuDetail}/>
      <Route path = "/storage" exact component={StorageBoard}/>
      <Route path = "/menuDialog" exact component={MenuDialog}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
