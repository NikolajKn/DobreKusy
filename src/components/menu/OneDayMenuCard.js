import React, {Component} from 'react'
import {Container, Row, Button, Col} from "react-bootstrap"
import PlusMinusButton from './commonElements/PlusMinusButton'
import MenuModal from "../menu-dialog/MenuModal"
class OneDayMenuCard extends Component {

    constructor(props){
        super(props);
        var recipes1 = this.props.recipes
        this.state = {recipes:recipes1}
        console.log(this.state)
    }

    addRecipe(recipe) {
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
    }

    render(){
        this.addRecipe("CCC")
        return(
            <Container className="recipeInMenu">
                <Row>
                    <MenuModal day="monday" number="1" add={this.addRecipe} />
                </Row>
                {
                    this.state.recipes && this.state.recipes.length != 0 ? 
                        this.state.recipes.map((recipe1, index) => 
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

export default OneDayMenuCard