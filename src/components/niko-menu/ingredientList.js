import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { InputGroup, Card, FormControl, Button, Form, ListGroup} from 'react-bootstrap';


const IngredientList = ({recipe,expiring}) => {
   
    const renderItem = (item,i) => {
        var alert = false
        if(expiring !== undefined){
            if(expiring.includes(item.name)){
                alert = true
            }
        }
        return (
            <ListGroup.Item title = {item.name} key = { i + item.name} >
                {alert ? 
                      <svg width="1.4em" height="1.4em" viewBox="0 0 16 16" style={{"backgroundColor": "#fff76a"}} className="bi bi-exclamation-circle rounded-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                  </svg>
                  :
                  null    
            
            }
                {" " + item.name + " " + item.amount + " " + item.measurementUnit }
            </ListGroup.Item>
        )
    }

    

    return (
        <Card as="section">
            <Card.Header as="header" style={{ color: "white", backgroundColor: "#069697" }}>
                Ingredients:
            </Card.Header>
            <ListGroup variant="flush" className={"flex-nowrap overflow-auto"} style={{"maxHeight":"300px"}}>
                {
                    recipe && recipe.ingredients.map((item, i) =>{
                        return(renderItem(item,i))
                    })
                }
            </ListGroup>
        </Card>
    )
    }
    


export default IngredientList