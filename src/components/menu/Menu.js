import {BrowserRouter, Switch, Route} from "react-router-dom"
import Nav from '../layout/Navbar'
import {connect} from "react-redux";



const Home = (props) => {

    return( 
        <BrowserRouter>
        <Nav />      
        <h1> Menu</h1>


        </BrowserRouter> 
            
    )      
}










const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home)