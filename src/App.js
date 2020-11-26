import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./components/home/Home"
import StorageBoard from "./components/storage/StorageBoard"
import './styles.css'
import Menu from './components/menu/Menu'
import Nav from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import Recipes from './components/recipes/Recipes'

function App() {
  return (
    <BrowserRouter>
        
        <Switch>
        
            <Route path='/signin' component={SignIn} />
            <Route path='/Menu' component={Menu} />
            <Route path='/Recipes' component={Recipes} />
            <Route path='/Home' component={Home} />
            <Route path = "/Storage" component={StorageBoard}/>
            <Route exact path = "/" component={SignIn}/>
      
        </Switch>
    </BrowserRouter>
  );
}

export default App;
