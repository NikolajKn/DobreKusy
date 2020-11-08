import React from "react";
import {Container, Row, Col, Button} from "react-bootstrap";

import {connect} from "react-redux";



const Home = (props) => {


    return(   
        <Container fluid>
            <Row style={{height : "200px"}}></Row>
            <Row style={{height : "100px"}}>
                <Col/>

                <Col xs = {3}>   
                    <Button className = "h-100" variant="secondary" size="lg" block>Menu</Button>
                </Col>  
                <Col xs = {3}>   
                    <Button className = "h-100" variant="secondary" size="lg" block>Recepty</Button>
                </Col> 
                <Col xs = {3}>   
                    <Button  className = "h-100" variant="secondary" size="lg" block>Sklad</Button>
                </Col>  

                <Col />   
            </Row> 
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