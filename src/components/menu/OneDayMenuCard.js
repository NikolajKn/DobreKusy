import React, {Component} from 'react'
import {Container, Row, Button, Col} from "react-bootstrap"
import PlusMinusButton from './commonElements/PlusMinusButton'

class OneDayMenuCard extends Component {

    constructor(props){
        super(props);
        var recipes1 = JSON.parse(localStorage.getItem("recipes"));
        var recipeAtDay1 = recipes1[props.index];
        this.state = {recipes:recipes1, recipeAtDay:recipeAtDay1}

    }

    addRecipe() {
        var newRecipeAtDay = this.state.recipeAtDay;
        newRecipeAtDay.push("RecipeRandom"); 
        this.setState({recipeAtDay:newRecipeAtDay});

        var newRecipes = this.state.recipes
        newRecipes[this.props.index] = this.state.recipeAtDay; 
        this.setState({recipes:newRecipes})
        localStorage.setItem("recipes", JSON.stringify(this.state.recipes))
    }

    render(){
        var recipes1 = JSON.parse(localStorage.getItem("recipes"));
        var recipeAtDay1 = recipes1[this.props.index];

        return(
            <Container className="recipeInMenu">
                <Row>
                    <Button variant="success" className="rounded-circle" onClick={()=>{this.addRecipe()}}> + </Button>
                </Row>
                {
                    recipeAtDay1 && recipeAtDay1.length != 0 ? 
                        recipeAtDay1.map((recipe, index) => 
                            <Row key={index}>
                                <Col sm={0.5}><Button variant="danger" className="rounded-circle"> X </Button></Col>
                                <Col sm={7}><p>{recipe}</p></Col>
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