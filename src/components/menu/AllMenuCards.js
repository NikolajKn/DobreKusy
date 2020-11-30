import React, {Component} from 'react'
import {Col, Row, Container, Button} from "react-bootstrap"
import MenuCard from "./MenuCard"
import { connect } from "react-redux"
import {fetchAllMenu} from "../../store/actions/menuActions"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";

class AllMenuCards extends Component{

    render(){
        return(
            <Container>
                {this.props.menu && Object.keys(this.props.menu).map((menu1, index) => 
                    <article key={index}>
                    <MenuCard 
                        index={menu1}
                        menu={this.props.menu[menu1]}
                    />
                    </article>
                )}
            </Container>

        )
    }
}
/*
const mapStateToProps = state => {
    return {
        menu: state.menu
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllMenu: () => dispatch(fetchAllMenu()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllMenu)

*/


const mapStateToProps = (state, props) => {
    return {
        menu: state.firestore.data.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllMenu: () => dispatch(fetchAllMenu()),
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"menu"}])
)(AllMenuCards)

