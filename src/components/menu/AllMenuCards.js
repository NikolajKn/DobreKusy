import React, {Component} from 'react'
import {Col, Row, Container, Button} from "react-bootstrap"
import MenuCard from "./MenuCard"
import { connect } from "react-redux"
import {fetchAllMenu} from "../../store/actions/menuActions"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";

class AllMenuCards extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
                <Container>
                    {this.props.menu && Object.keys(this.props.menu).map((menu1, index) => 
                        <article key={index}>
                        {
                        <MenuCard 
                            index={menu1}
                            menu={this.props.menu[menu1]}
                            sidebar = {this.props.sidebar}
                        />
                        }
                        </article>
                    )}
                </Container>
            )
        }
}

const mapStateToProps = (state, props) => {
    return {
        menu: state.firestore.data.menu,
        menu1: state.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllMenu: () => dispatch(fetchAllMenu()),
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"menu", orderBy:["state","desc"]}])
)(AllMenuCards)

