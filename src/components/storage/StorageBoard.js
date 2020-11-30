import React, { useEffect, useState } from "react";
import {Container, Row, Col, Button, ListGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";

import {addItem} from "../../store/actions/storageActions"
import StorageItem from "./StorageItem"



const StorageBoard = (props) => {
    var {addItem,storage} = props
    
    const handleAdd = () => {
        addItem()
    }


    const renderItem = (item, id) => {
        return(
            <StorageItem key = {id} item = {item}/>
        )
    }

    return(         
        <Container fluid>
            {
            storage===undefined ?
                <div>
                    Loading
                </div>
                :
                <Container>
                <Row style={{height : "200px"}}>
                    
                </Row>
                            
                <Row className="justify-content-center">            
                    <Col xs={8}>   
                        <h2>Storage</h2>
                        <Button variant={"dark"} onClick={() => handleAdd()}>+</Button>
                            {
                                storage && Object.keys(storage).map((item) => {
                                    return(renderItem({...storage[item],id:item}, item))
                                })
                            }                       
                    </Col>     
                        
                </Row>          
                </Container>
            }
        </Container>
        
    )      
}

const mapStateToProps = (state, props) => {
    return {
        storage: state.firestore.data.storage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       addItem: () => dispatch(addItem())
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"storage"}])
)(StorageBoard)