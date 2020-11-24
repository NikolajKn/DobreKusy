import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./components/home/Home"
import StorageBoard from "./components/storage/StorageBoard"
import './styles.css'

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path = "/Storage" component={StorageBoard}/>
      <Route exact path = "/" component={Home}/>
      
    </Switch>
    </BrowserRouter>
  );
}

export default App;
