import React from "react";
import {Container, Row, Col, Button} from "react-bootstrap";

import {connect} from "react-redux";
import logo from './logo.png';
import firebase from "firebase"
import { useState } from "react";


const Home = (props) => {

    return(   
        <Container className={"text-center mt-3"} fluid>

        </Container>
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