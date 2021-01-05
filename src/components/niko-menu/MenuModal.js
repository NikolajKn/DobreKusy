import React, {useEffect, useState } from "react";
import { Button, Modal, Container, Row, Col, Form } from 'react-bootstrap'
import { connect } from "react-redux"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { useMediaQuery } from 'react-responsive'

import RecipeList from "./recipeList"
import IngredientList from "./ingredientList"
import ExpiringList from "./expiringIngredients"

var currentDate = new Date(Date.now())

const MenuModal = ({day = "monday",recipeList, storage, menu, setNewMenu}) => {

    const [recipes,setRecipes] = useState()
    const [activeRecipe, setActiveRecipe] = useState(null)
    const [modalControl, setModalControl] = useState(false)

    var newMenu = menu.newMenu
    
    useEffect(() => {
        setRecipes(recipeList)
    },[recipeList])

    const selectRecipe = (rec) => {
        var recipe = recipes.filter((item) => {
            return (item.name === rec.name)
        })
        
        setActiveRecipe(recipe[0])
    }

    const handleAmountChange = (e) => {
        var amount = e.target.value

        if(activeRecipe === null){
            return
        }
    
        setActiveRecipe({...activeRecipe, portions: amount.toString()})
    }

    const handleSave = () => {
        var rec = []
              if (day === "monday") {
                rec = menu.newMenu.monday
                rec.push({ recipe: activeRecipe.id, portions: activeRecipe.portions })
                newMenu.monday = rec
              } else if (day === "tuesday") {
                rec = menu.newMenu.tuesday
                rec.push({ recipe: activeRecipe.id, portions: activeRecipe.portions })
                newMenu.tuesday = rec
              } else if (day === "wednesday") {
                rec = menu.newMenu.wednesday
                rec.push({ recipe: activeRecipe.id, portions: activeRecipe.portions })
                newMenu.wednesday = rec
              } else if (day === "thursday") {
                rec = menu.newMenu.thursday
                rec.push({ recipe: activeRecipe.id, portions: activeRecipe.portions })
                newMenu.thursday = rec
              } else if (day === "friday") {
                rec = menu.newMenu.friday
                rec.push({ recipe: activeRecipe.id, portions: activeRecipe.portions })
                newMenu.friday = rec
              }

              setNewMenu(newMenu)
              setModalControl(false)
    }

    var expiring = []
    if(storage !== undefined){
        storage.map((item) => {
            expiring = [...expiring,item.name]
        })
    }

    const isSmall = useMediaQuery({ query: '(max-width: 500px)' })
    const isMedium = useMediaQuery({ query: '(max-width: 1200px)' })

    return (
        <div>
        <Button variant="success" className="rounded-circle" onClick={()=>setModalControl(!modalControl)} style={isSmall ? {padding:"0%", height:"42px", width:"42px", marginBottom: "5%"}:null} > + </Button>
        
        <Modal
            as="form"
            backdrop="static"
            keyboard={false}
            show={modalControl}
            onHide={()=>console.log("blas")}
            dialogClassName={isSmall ? "my-modal-small" : isMedium ? "my-modal-small" : "my-modal"}
        >
            <Modal.Header as={"section"} style={{ backgroundColor: "#f0f1f2", padding: "20px" }}>
            <Modal.Title>Menu {day}</Modal.Title>
            <Button variant="danger" onClick={()=>setModalControl(!modalControl)} style={{ fontWeight: "bold" }}>x</Button>

            </Modal.Header>
         
            <Modal.Body className="bg-light" style={{ paddingTop: "0" }}>
                <Container>
                    <Row>
                        <ExpiringList ingredients = {storage}></ExpiringList>
                    </Row>
                    {
                        isSmall ?
                            <Container>
                                <Row>
                                    <Col>
                                        <RecipeList allRecipes = {recipeList} recipes = {recipes} activeRecipe={activeRecipe} setRecipes={setRecipes} selectRecipe = {selectRecipe}></RecipeList>
                                    </Col>
                                </Row>
                                <Row className={"mt-2"}>
                                    <Col>
                                        {
                                            activeRecipe !== null ? 
                                                <IngredientList recipe = {activeRecipe} expiring = {expiring}></IngredientList>
                                            :
                                                null
                                        }
                                    </Col>
                                </Row>
                            </Container>
                        :
                            <Row>
                                <Col>
                                    <RecipeList allRecipes = {recipeList} recipes = {recipes} activeRecipe={activeRecipe} setRecipes={setRecipes} selectRecipe = {selectRecipe}></RecipeList>
                                </Col>
                                <Col>
                                    {
                                        activeRecipe !== null ? 
                                            <IngredientList recipe = {activeRecipe} expiring = {expiring}></IngredientList>
                                        :
                                            null
                                    }
                                </Col>
                            </Row>
                    }

                   
                </Container>  
            </Modal.Body>
            
            <Modal.Footer as="footer" className="bg-light" style={{ justifyContent: 'center', border: "0" }}>
                <Container >
                    <Row className="justify-content-center mt-2">
                        Number of recipes:    
                    </Row>
                    <Row className="justify-content-center">
                        <Form.Control
                            className="textAllign-left" style = {{"width":"30%"}}
                            type="number"
                            placeholder="Number of recipes"
                            id="editAmount"
                            onChange={handleAmountChange}
                        />
                    </Row>
                    <Row className="justify-content-center mt-2">
                        <Button variant = "success" style = {{"width":"20%"}} onClick={()=>handleSave()}>Select</Button>    
                    </Row>
                </Container>
            </Modal.Footer>

        </Modal>
        </div>
  );
}



const setNewMenu = (menu) => {
    console.log(menu)
  return {
    type: "PUSH_RECIPES",
    payload: menu
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //addItem: () => dispatch(addItem())
    setNewMenu: (menu) => dispatch(setNewMenu(menu))
  }
}

    
const mapStateToProps = (state, props) => {
    return {
        recipeList: state.firestore.ordered.recipes,
        storage : state.firestore.ordered.storage,
        menu: state.menu
    }
}
  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "recipes" },{collection:"storage",orderBy:["expirationDate","asc"],where:['expirationDate','<=',currentDate]}])
)(MenuModal)
