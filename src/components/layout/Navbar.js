import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Nav } from 'react-bootstrap';
import './st.css'

const Navbar = () => {

  return (
    <Nav justify variant="tabs" defaultActiveKey="/home" bg-dark>
  <Nav.Item>
    <Nav.Link href="home">Home</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="Menu">Menu</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="Recipes">Recipes</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="Storage" href="Storage">Storage </Nav.Link>
  </Nav.Item>
</Nav>
  )
}

            const mapStateToProps = (state) => {
                // console.log(state);
                return{
                    auth: state.firebase.auth
                }
            }

            export default connect(mapStateToProps)(Navbar)
