import React from 'react'
import { connect } from 'react-redux'
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import firebase from "firebase"


const NikoNav = () => {
    
    var user = firebase.auth().currentUser
    return (
    
        <Navbar bg="dark" variant= "dark" expand="lg" >
            <Navbar.Brand href="Home" style={{"color":" #069697"}}>Storage Master</Navbar.Brand>
            
                {
                    user ? 
                        <Nav className="mr-auto" defaultActiveKey="/home">
                            <Nav.Item>
                                <Nav.Link className="text-white" href="Menu">Menu</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="text-white" href="Recipes" >Recipes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="text-white" href="Storage" >Storage </Nav.Link>
                            </Nav.Item>    
                           
                        </Nav>
                    :
                        <Nav className="mr-auto"></Nav>
                }
                
                {
                    user ?
                    <Nav className="xs-2">
                        <Nav.Item>
                            <Nav.Link className="text-white" onClick={()=>firebase.auth().signOut()}>SignOut </Nav.Link>
                        </Nav.Item>
                    </Nav>
                :
                    <Nav className="xs-2">
                        <Nav.Item>
                            <Nav.Link className="text-white" href="SignIn" >SignIn </Nav.Link>
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

export default connect(mapStateToProps)(NikoNav)
