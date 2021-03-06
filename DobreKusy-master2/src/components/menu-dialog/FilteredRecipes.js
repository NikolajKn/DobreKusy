import React,{Component} from "react";
import {InputGroup,Card,FormControl,Button,Form} from 'react-bootstrap';

import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";

import {addItem} from "../../store/actions/recipeActions"

class FilteredRecipes extends Component{

    constructor(props){
        super(props);
        console.log(this.props.recipes)
        var recipes1ID = []
        this.props.recipes && Object.keys(this.props.recipes).map((recipe, index) => 
            recipes1ID.push(recipe)
        )
        var recipes1 = []
        recipes1ID.map((recipe, index) => 
            recipes1.push(this.props.recipes[recipe].name)
        )
        this.state = {
            recipes: recipes1,
            recipesID: recipes1ID,
            selected:"",
            search:null,
            selectedRadioId:null,
            filterRecipes:[]
        };
    }


    onChangeRadio = (e) =>{
        var newSelected = e.target.dataset.recipe;
        console.log(e.target.dataset.recipe);
        this.setState({selected:newSelected});
        var newSelectedRadioId = e.target.id;
        this.setState({selectedRadioId:newSelectedRadioId});
        this.props.recipes && Object.keys(this.props.recipes).map((recipe, index) => {
            if(this.props.recipes[recipe].name == newSelected){
                this.props.set(recipe)
            }  
        })
       // this.props.set(newSelected)
    }

    onChangeSearch = (e) =>{
        var newSearch = e.target.value;
        this.setState({search:newSearch});

        var newSelected = "";
        console.log(e.target.dataset.recipe);
        this.setState({selected:newSelected});
        var newSelectedRadioId = null;
        this.setState({selectedRadioId:newSelectedRadioId});
        
    }

    render(){
        var filterRecipes = []
        if(this.props.menuState.filterIngredients.length == 0){
            filterRecipes = this.state.recipes
        } else{
            var arrIngr = this.props.menuState.filterIngredients;
            for(let i = 0; i < this.state.recipesID.length; i++){
                var name = this.props.recipes[this.state.recipesID[i]].name
                var recipeIngredients = []
                console.log(this.props.recipes[this.state.recipesID[i]].ingredients)
                for(let j = 0; j < this.props.recipes[this.state.recipesID[i]].ingredients.length; j++){
                    if(this.props.recipes[this.state.recipesID[i]].ingredients[j]){
                        recipeIngredients.push(this.props.recipes[this.state.recipesID[i]].ingredients[j].name)
                    }
                }
                var correct = true
                for(let j = 0; j < arrIngr.length; j++){
                    if(!recipeIngredients.includes(arrIngr[j])){
                        correct = false
                    }
                }
                if(correct){
                    filterRecipes.push(name)
                }
            }
        }
        return(

        <Card style = {{borderColor:"#64697A"}}>
            <Card.Header style={{ backgroundColor: '#64697A', color:'white'  }}>
            
                        <h4 className="float-left" style={{width:"50%"}}>Found recipes:</h4>
                            <Form.Control
                            className="float-right" style={{width:"50%"}}
                            type= "text"
                            placeholder="Search recipe"
                            id = "filterRecipe"
                            onChange = {this.onChangeSearch}
                            />
            </Card.Header>
            <Card.Body style = {{overflow: "auto", height:"200px"}}>

                {
                    filterRecipes.filter((data)=>{
                        if(this.state.search == null)
                            return data
                        else if(data.toLowerCase().includes(this.state.search.toLowerCase())){
                            return data
                        }
                      }).map((recipe,index)=> 
                      <Form.Check 
                    key={index}
                    type="radio" 
                    label={recipe} 
                    id = {"r"+index} 
                    checked={this.state.selectedRadioId === "r"+index}
                    name ="recipe"
                    data-recipe={recipe}
                    onChange = {this.onChangeRadio}
                    style = {{fontSize:"20px"}}
                    />
                      )}
            
            </Card.Body>
          </Card>

        )
    }
}


  
const mapStateToProps = (state, props) => {
    return {
        recipes: state.firestore.data.recipes,
        menuState: state.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       addItem: () => dispatch(addItem())
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"recipes"}])
)(FilteredRecipes)