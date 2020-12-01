import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./components/home/Home"
import StorageBoard from "./components/storage/StorageBoard"
import './styles.css'
import Navigation from './components/layout/Navbar'
//import Menu from './components/menu/Menu'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
//import Recipes from './components/recipes/Recipes'
import NikoNav from './components/layout/NikoNav'
import NikoSignIn from './components/auth/NikoSignIn'

function App() {
  return (
    <BrowserRouter>
    <NikoNav></NikoNav>
    <Switch>
      <Route path = "/Storage" component={StorageBoard}/>
      <Route path='/SignIn' component={NikoSignIn} />
      
      {/*<Route path='/Menu' component={Menu} />
      <Route path='/Recipes' component={Recipes} />*/}
      <Route path='/Home' component={Home} />
      <Route exact path = "/" component={Home}/>
      
    </Switch>
    </BrowserRouter>
  );
}

export default App;
