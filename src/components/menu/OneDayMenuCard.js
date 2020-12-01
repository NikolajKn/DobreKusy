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

 /*   addRecipe(recipe) {
        console.log("NEWWW")
        console.log(recipe)
        console.log(this.state)
        if(this.state){
            var newRecipes = this.state.recipes
            newRecipes.push(recipe);
            console.log("NEWWW")
            console.log(recipe)
            //this.setState({recipes:newRecipes})
        }
    }*/

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
                                <Col sm={0.5}><Button variant="danger" className="rounded-circle"> X </Button></Col>
                                <Col sm={7}><p>{recipe1.recipe}</p></Col>
                                <Col sm={4.5}><PlusMinusButton /></Col>
                            </Row>
                        ) 
                    :
                    <p>You have no recipes.</p>
                }
            </Container>
        )
    }
     
}

const mapStateToProps = (state, props) => {
    return {
        menu1: state.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"menu", orderBy:["state","desc"]}])
)(OneDayMenuCard)

