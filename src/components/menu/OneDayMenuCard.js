import React, {Component} from 'react'
import {Container, Row, Button, Col} from "react-bootstrap"
import PlusMinusButton from './commonElements/PlusMinusButton'
import MenuModal from "../menu-dialog/MenuModal"
import { connect } from "react-redux"
import {fetchAllMenu} from "../../store/actions/menuActions"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
class OneDayMenuCard extends Component {

    constructor(props){
        super(props);
        console.log(this.props.recipes)
        var recipes1 = this.props.recipes
        this.state = {recipes:recipes1}
        console.log(this.state)
    }

    handleClick2 = (e) => {

        var index = "t"+e.target.id.replace("b","");
        var newFilterText = this.state.filterText;
        delete newFilterText[index];
        this.setState({filterText:newFilterText})
        console.log(this.state.filterText)
        
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
            <Container className="recipeInMenu">
                <Row>
                    <MenuModal day={this.props.day} number="1" /*add={this.addRecipe}*/ />
                </Row>
                {
                     recipes && recipes.length != 0 ? 
                        recipes.map((recipe1, index) => 
                            <Row key={index}>
                                <Col sm={0.5}><Button variant="danger" className="rounded-circle" data-index = {index} 
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
                                <Col sm={7}><p style={{color:"black"}}>{this.props.recipes1[recipe1.recipe].name}</p></Col>
                            </Row>
                        ) 
                    :
                    <p>You have no recipes.</p>
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
/*
<Col sm={4.5}><PlusMinusButton /></Col>
*/