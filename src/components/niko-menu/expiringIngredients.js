import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { InputGroup, Card, FormControl, Button, Form, ListGroup} from 'react-bootstrap';


const ExpiringIngredients = ({ingredients}) => {

    const renderItem = (item,i) => {

        return (
            <ListGroup.Item title = {item.name} key = { i + item.name}>{item.name + " " + item.amount + " " + item.measurementUnit}</ListGroup.Item>
        )
    }
    
    return (
        <Card as="section" className="mt-2 mb-2">
            <Card.Header as="header" style={{ color: "white", backgroundColor: "#069697" }}>
                Expiring Ingredients:
            </Card.Header>
            <ListGroup className={"flex-nowrap overflow-auto"} horizontal>
                {
                    ingredients && ingredients.map((item, i) =>{
                        return(renderItem(item,i))
                    })
                }
            </ListGroup>
        </Card>
    )
    }
    


export default ExpiringIngredients