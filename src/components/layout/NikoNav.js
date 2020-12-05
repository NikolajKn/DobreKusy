import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav , NavDropdown, Row} from 'react-bootstrap';
import firebase from "firebase"
import '../../styles.css'
import {withRouter} from "react-router-dom"

const NikoNav = (props) => {
    var user = firebase.auth().currentUser
    console.log(props.location)
    return (
        <Navbar bg="dark" variant= "dark" expand="lg" >
            <Navbar.Brand href="Home" className ="font-weight-bold pr-3" style={{"fontSize": "1.5em"}}>
                <Row><div >Stora</div><div style={{"color":" #069697"}}>g</div><div>eMaster</div></Row>  
            </Navbar.Brand>
                {
                    user ? 
                        <Nav className="mr-auto" defaultActiveKey="/home">
                            <Nav.Item className="pl-3 pr-3" >
                                <Nav.Link className={props.location.pathname === "/Menu" ? "myNavItemActive":"myNavItem"}  href="Menu">Menu</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pl-3 pr-3">
                                <Nav.Link className={props.location.pathname === "/Recipes" ? "myNavItemActive":"myNavItem"} href="Recipes">Recipes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pl-3 pr-3">
                                <Nav.Link className={props.location.pathname === "/Storage" ? "myNavItemActive":"myNavItem"} href="Storage">Storage </Nav.Link>
                            </Nav.Item>      
                        </Nav>
                    :
                        <Nav className="mr-auto"></Nav>
                }
                
                {
                    user ?
                    <Nav className="xs-2">
                            <NavDropdown title={user.email} id="nav-dropdown">
                                <NavDropdown.Item eventKey="4.1" onClick={()=>firebase.auth().signOut()}>Log Out</NavDropdown.Item>
                            </NavDropdown>      
                    </Nav>
                :
                    <Nav className="xs-2">
                        <Nav.Item>
                            <Nav.Link className="text-white font-weight-bold" style={{"fontSize": "1.2em"}} href="SignIn" >SignIn </Nav.Link>
                        </Nav.Item>
                    </Nav>
                }

        </Navbar>

  )
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

export default withRouter(connect(mapStateToProps)(NikoNav))
