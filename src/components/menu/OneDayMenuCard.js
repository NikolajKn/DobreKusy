import React, {Component} from 'react'
import {Container, Row, Button, Col} from "react-bootstrap"
import PlusMinusButton from './commonElements/PlusMinusButton'
import MenuModal from "../menu-dialog/MenuModal"
import { connect } from "react-redux"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
class OneDayMenuCard extends Component {

    constructor(props){
        super(props);
        var recipes1 = this.props.recipes
        this.state = {recipes:recipes1}
    }

    render(){
        var recipes = [];
        if (this.props.day == "monday"){
            recipes = this.props.menu1.newMenu.monday
        } else if(this.props.day == "tuesday"){
            recipes = this.props.menu1.newMenu.tuesday
        } else if(this.props.day == "wednesday"){
            recipes = this.props.menu1.newMenu.wednesday
        } else if(this.props.day == "thursday"){
            recipes = this.props.menu1.newMenu.thursday
        } else if(this.props.day == "friday"){
            recipes = this.props.menu1.newMenu.friday
        }

        return(
            <Container className="recipeInMenu" as={"article"}>
                <Row>
                    <MenuModal day={this.props.day} number="1" /*add={this.addRecipe}*/ />
                </Row>
                {
                     recipes && recipes.length != 0 ? 
                        recipes.map((recipe1, index) => 
                            this.props.recipes1[recipe1.recipe] ? 
                            !this.props.isSmall ?                           <Row key={index}>
                            <Col sm={0.5}><Button variant="danger" style={{marginTop:"2%"}} className="rounded-circle" data-index = {index} 
                        onClick={(e)=> {
                            recipes.splice(e.target.dataset.index, 1);
                            var newMenu= this.props.menu1.newMenu
                            if (this.props.day == "monday"){
                                newMenu.monday = recipes
                            } else if(this.props.day == "tuesday"){
                                newMenu.tuesday = recipes
                            } else if(this.props.day == "wednesday"){
                                newMenu.wednesday = recipes
                            } else if(this.props.day == "thursday"){
                                newMenu.thursday = recipes
                            } else if(this.props.day == "friday"){
                                newMenu.friday = recipes
                            }
                            this.props.setNewMenu(newMenu)
                        }}> X </Button></Col>
                            <Col sm={7}><p>{this.props.recipes1[recipe1.recipe].name}</p></Col>
                            <Col sm={4.5}><PlusMinusButton day={this.props.day} index={index} oldMenu={this.props.menu1.newMenu} setNewMenu={this.props.setNewMenu.bind(this)} isSmall={this.props.isSmall} /></Col>
                        </Row>
                            
                        : <Row key={index}>
                        <Col xs={0.5}><Button variant="danger" className="rounded-circle" style={{padding:"0%", height:"40px", width:"40px"}} data-index = {index} 
                    onClick={(e)=> {
                        recipes.splice(e.target.dataset.index, 1);
                        var newMenu= this.props.menu1.newMenu
                        if (this.props.day == "monday"){
                            newMenu.monday = recipes
                        } else if(this.props.day == "tuesday"){
                            newMenu.tuesday = recipes
                        } else if(this.props.day == "wednesday"){
                            newMenu.wednesday = recipes
                        } else if(this.props.day == "thursday"){
                            newMenu.thursday = recipes
                        } else if(this.props.day == "friday"){
                            newMenu.friday = recipes
                        }
                        this.props.setNewMenu(newMenu)
                    }}> X </Button></Col>
                        <Col xs={7} style={{fontSize:"1.5em"}}>{this.props.recipes1[recipe1.recipe].name}</Col>
                        <Col xs={2}><PlusMinusButton day={this.props.day} index={index} oldMenu={this.props.menu1.newMenu} setNewMenu={this.props.setNewMenu.bind(this)} isSmall={this.props.isSmall} /></Col>
                    </Row>
                        : null
                        ) 
                    :
                    <p style={this.props.isSmall?{fontSize:"1.5em"}:null}>You have no recipes.</p>
                }
            </Container>
        )
    }
     
}

const setNewMenu = (menu) => {
    return {
        type: "PUSH_RECIPES", 
        payload: menu
    }
}

const mapStateToProps = (state, props) => {
    return {
        menu1: state.menu,
        recipes1: state.firestore.data.recipes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNewMenu: (menu) => dispatch(setNewMenu(menu)) 
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"menu", orderBy:["state","desc"]},{collection:"recipes"}])
)(OneDayMenuCard)
