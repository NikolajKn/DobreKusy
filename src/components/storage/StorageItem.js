import React, { useState }from "react";
import {Container, Row, Col, Button, Form,Card} from "react-bootstrap";
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {editItem} from "../../store/actions/storageActions"



const StorageBoard = ({item, editItem}) => {
    

    var itemDate = new Date(item.expirationDate.seconds*1000)
    var currentDate = new Date(Date.now())
    var dateDiff =  Math.floor(( itemDate - currentDate ) / 86400000);
    var expiration = itemDate.toLocaleDateString("en-GB")

    const [edit, setEdit] = useState({editing: false})
    const [values, setValues] = useState({...item, expiration : expiration, dateForPicker: itemDate})
   
    const getCardBg = () => {
        if(dateDiff <= 7){
            return "danger"
        }else if(dateDiff > 7 && dateDiff < 14){
            return"warning"
        }else{
            return"success"
        }
    }

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
 
        setValues({...values,
          [name]: e.target.value
        });
      }
    
    const handleEditClick = (e) => {  
        if(edit.editing){
            editItem(values)
        }
        
        setEdit({editing : !edit.editing})
    }

    const handleDatePick = (e) => {

        setValues({...values, expirationDate : e, expiration: e.toLocaleDateString("en-GB"), dateForPicker : e})
    }

    const showItem = () => {
        return(
            <Container>
                <Row>
                    <Col className={"text-left p-0"}>
                        {values.amount}
                    </Col>
                    <Col className={"text-center p-0"}>
                        {values.measurementUnit}
                    </Col>
                    <Col className={"text-right p-0"}>
                        {values.expiration}
                    </Col>
                </Row>
            </Container>
        )
    }

    const showEditItem = () => {
        return(
            <Container fluid>
                <Form >
                    <Form.Row>
                        <Col> 
                            <Form.Control type='text' name="amount" placeholder="Amount" value={values.amount} onChange={handleInputChange} />
                        </Col>
                        <Col> 
                            <Form.Control type='text' name="measurementUnit" placeholder="Unit" value={values.measurementUnit} onChange={handleInputChange}/>
                        </Col>
                        <Col> 
                            <DatePicker selected={values.dateForPicker} onChange={date => handleDatePick(date)} />
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        )
    }

    

    return(   
        <Card bg={getCardBg()}>    
             <Card.Header className={"d-flex justify-content-between p-1"} >
                <h5>{item.name}</h5>
                <Button variant={"dark"} size={"xxs"} onClick={() => handleEditClick()} >
                    {
                        edit.editing ? 
                                "Save"
                            :
                                "Edit"
                    }
                </Button>
            </Card.Header>
            <Card.Body className={"d-flex justify-content-between p-1"}>
            {
                edit.editing ? 
                    showEditItem()
                :
                    showItem()
            }   
           
           </Card.Body>
        </Card>
       
    )      
}


const mapStateToProps = (state, props) => {
    return {
   
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       //addItem: () => dispatch(addItem())
       editItem: (item) => dispatch(editItem(item))
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    //firestoreConnect([{}])
)(StorageBoard)