import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./components/home/Home"

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path = "/" component={Home}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
