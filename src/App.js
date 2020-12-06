import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./components/home/Home"
import StorageBoard from "./components/storage/StorageBoard"
import './styles.css'
import Navigation from './components/layout/Navbar'
import Menu from './components/menu/Menu'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
//import Recipes from './components/recipes/Recipes'
import NikoNav from './components/layout/NikoNav'
import NikoSignIn from './components/auth/NikoSignIn'
import AllMenuMinimal from "./components/menu/AllMenuMinimal"
import Footer from "./components/menu-dialog/footer"
import firebase from "firebase"
import { connect } from 'react-redux'

function App(props) {
  return (
    <BrowserRouter>
    <NikoNav ></NikoNav>
    {
        props.auth.isLoaded && !props.auth.isEmpty ?
          <Switch>
            <Route path='/SignIn' component={NikoSignIn} />
            <Route path = "/Storage" component={StorageBoard}/>
            <Route path='/Menu' component={Menu} />
            {/*<Route path='/Recipes' component={Recipes} />*/}
            <Route path='/Home' component={Home} />
            <Route path = "/" component={Home}/> 
          </Switch>
        :
        <Switch>
          <Route path='/SignIn' component={NikoSignIn} />
          <Route path = "/" component={Home}/> 
        </Switch>
    }
    <Footer></Footer>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return{
      auth: state.firebase.auth
  }
}


export default connect(mapStateToProps)(App);
