import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { InputGroup, Card, FormControl, Button, Form, ListGroup} from 'react-bootstrap';


const RecipeList = ({allRecipes, recipes, activeRecipe, setRecipes, selectRecipe}) => {

    const handleSearch = (e) => {
        var searchVal = e.target.value
        var items = allRecipes.filter((item) => {
            //console.log(item.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())
            return (item.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(searchVal))
        })
        setRecipes(items)
    }

    const handleClick = (e) => {
        var name = e.target.title

        var findActive = recipes.filter((item) => {
            return (item.name === name)
        })
        var temp = findActive[0]
        selectRecipe(temp)
    }

    const renderItem = (item) => {
        var active = false
        if (activeRecipe !== null){
            active = item.name === activeRecipe.name
        }
        
        return (
            <ListGroup.Item variant={active ? "primary":""} title = {item.name} key = {item.id} onClick={handleClick} >{item.name}</ListGroup.Item>
        )
    }

    return (
        <Card as="section">
            <Card.Header as="header" style={{ color: "white", backgroundColor: "#069697" }}>
                <Form.Control
                    className="" style={{ width: "75%" }}
                    type="text"
                    placeholder="Search recipe"
                    id="filterRecipe"
                    onChange={handleSearch}
                />
            </Card.Header>
            <ListGroup variant="flush" className={"flex-nowrap overflow-auto"} style={{"maxHeight":"300px"}}>
                {
                    recipes && recipes.map((item) =>{
                        return(renderItem(item))
                    })
                }
            </ListGroup>
        </Card>
    )
    }
    


export default RecipeList