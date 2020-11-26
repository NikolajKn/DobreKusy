import React from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Nav from '../layout/Navbar'
import {connect} from "react-redux";
import logo from './logo.png';



const Home = (props) => {


    return( 
         <BrowserRouter>
        <img src={logo} alt="Logo" />
        <Nav /> 
        
      
        
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