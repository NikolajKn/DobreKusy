import React, {Component} from 'react'
import {Button, Container} from "react-bootstrap"
import AllMenuCards from "./AllMenuCards"
import AllMenuMinimal from "./AllMenuMinimal"
import MenuDetailSelection from "./MenuDetailSelection"
import { connect } from "react-redux"
import {compose} from "redux";
import './Menu.css';
import { firestoreConnect } from "react-redux-firebase";
import { useMediaQuery } from 'react-responsive'

const Menu = (props) => {

    const isSmall = useMediaQuery({ query: '(max-width: 1000px)' });

        if(!props.menu1.actualMenu){
            return(
                props.menu1.minimal ? 
                <AllMenuMinimal isSmall={isSmall}/>
                : 
                <Container as={"section"}>
                    <h1>All menu</h1>
                    <Button variant="success" className="buttonAddMenu" style={{margin:"0%"}} onClick={() => {props.setMinimal(true)}}> + New menu</Button>
                    <AllMenuCards numCol="6" isSmall={isSmall}/>
                </Container>
            )
        } else {
            return <MenuDetailSelection index={props.menu1.actualMenu} />
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