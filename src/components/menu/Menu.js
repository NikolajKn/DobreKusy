import React, {Component} from 'react'
import {Button, Container} from "react-bootstrap"
import AllMenuCards from "./AllMenuCards"
import AllMenuMinimal from "./AllMenuMinimal"
import MenuDetail from "./MenuDetail"
import { connect } from "react-redux"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Menu extends Component{

    constructor(props){
        super(props);
    }

    render(){
        if(!this.props.menu1.actualMenu){
            return(
                this.props.menu1.minimal ? 
                <AllMenuMinimal/>
                : 
                <Container>
                    <h1>All menu</h1>
                    <Button variant="success" className="buttonAddMenu" onClick={() => this.props.setMinimal(true)}> + New menu</Button>
                    <AllMenuCards numCol="6"/>
                </Container>
            )
        } else {
            return <MenuDetail index={this.props.menu1.actualMenu} />
        }
    }
}

const setMinimal = (minimal) => {
    return {
        type: "SET_MINIMAL", 
        payload: minimal
    }
}

const mapStateToProps = (state, props) => {
    return {
        menu1: state.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMinimal: (minimal) => dispatch(setMinimal(minimal)) 
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"menu", orderBy:["state","desc"]}])
)(Menu)