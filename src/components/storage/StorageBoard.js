import React, { useEffect, useState } from "react";
import {Container, Row, Col, Button, ListGroup, Table, Form,Collapse, Fade} from "react-bootstrap";
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";

import {addItem} from "../../store/actions/storageActions"
import StorageItem from "./StorageItem"
import DatePicker from "react-datepicker";


const StorageBoard = (props) => {
    var {addItem,storage} = props

    const [add, setAdd] = useState(false)
    const [newItem, setNewItem] = useState({})

    const handleAdd = () => {
        setAdd(!add)
    }

    const handleChange = (e, name) => {
        var value = ""
        if(name === "expirationDate"){
            value = e.target.valueAsDate
        }else{
            value = e.target.value
        }
        setNewItem({...newItem, [name] : value})
    }

    const handleSave = () => {
        if(Object.keys(newItem).length === 4){
            if(newItem.name !== "" && newItem.amount !== "" && newItem.measurementUnit !== "" && newItem.expirationdate !== ""){ 
                addItem(newItem)
            }
        }
    }

    const renderItem = (item, id) => {
        if(Object.keys(item).length > 1){
            return(
                <StorageItem key = {item.id} item = {item}/>
            )
        }else{
            console.log("nechapem kde som sa zobral", item)
        }
    }

    const showForm = () => {
        return(
            <Collapse className={"p-1"} in={add}>
                <Form id="addFormCollapse">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={(e) => handleChange(e,"name")}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" placeholder="Enter Amount" onChange={(e) => handleChange(e,"amount")}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridUnit">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control type="text" placeholder="Enter Unit" onChange={(e) => handleChange(e,"measurementUnit")}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridExpiration">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Expiration Date" onChange={(e) => handleChange(e,"expirationDate")}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button variant = {"success"} onClick={() => handleSave()}>Save</Button>
                    </Form.Row>
                </Form>
            </Collapse>
        )
    }
      
    return(       
        <Container fluid>
            {
            storage===undefined ?
                <div>
                    <h1>Loading</h1>
                </div>
                :
                <Container>
                <Row style={{height : "100px"}}/>
            
                <Row className="justify-content-center">            
                    <Col >  
                        <h1 style={{"color":"#069697"}}>Storage</h1>
                        <Button 
                        className={"m-1"}
                        variant={"success"} 
                        onClick={() => handleAdd()}
                        aria-controls="addFormCollapse"
                        aria-expanded={add}
                        >+</Button>
                        {
                            showForm()
                        }
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Unit</th>
                                <th>Expiration Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                storage && storage.map((item) => {
                                    //return(renderItem({...storage[item],id:item}, item))
                                    return(renderItem(item, null))
                                })
                            }    
                        </tbody>   
                            </Table>                
                    </Col>          
                </Row>          
                </Container>
            }
        </Container>
    )      
}

const mapStateToProps = (state, props) => {
    return {
        storage: state.firestore.ordered.storage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       addItem: (item) => dispatch(addItem(item))
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"storage",orderBy:["expirationDate","asc"]}])
)(StorageBoard)