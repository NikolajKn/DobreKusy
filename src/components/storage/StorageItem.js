import React, { useEffect, useState }from "react";
import {Container, Row, Col, Button, Form, Card, Table, OverlayTrigger, Tooltip} from "react-bootstrap";
import {connect} from "react-redux";
import {compose} from "redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {editItem, deleteItem} from "../../store/actions/storageActions"


const StorageItem = ({item, editItem, deleteItem}) => {
    console.log(item)
    var itemDate = new Date(item.expirationDate.seconds*1000)
    var currentDate = new Date(Date.now())
    var dateDiff =  Math.floor(( itemDate - currentDate ) / 86400000);
    var expiration = itemDate.toLocaleDateString()
    var tempDate = itemDate
    //tempDate.setDate(itemDate.getDate()+1)
    var defaultDate = tempDate.toISOString().substr(0,10)

    useEffect(()=>{
        setValues({...item, expiration : expiration, dateForPicker: defaultDate})
    },[item])

    const [edit, setEdit] = useState({editing: false})
    const [values, setValues] = useState({})

    const handleInputChange = (e, name) => {
        setValues({...values,
          [name]: e.target.value
        });
      }
    
    const handleEditClick = (e) => {  
        if(edit.editing){
            console.log(values)
            editItem(values)
        }
        setEdit({editing : !edit.editing})
    }

    const handleDeleteClick = (e) => {  
        deleteItem(values)
    }

    const handleDatePick = (e) => {
        var date = new Date(e)
        setValues({...values, expirationDate : date, expiration: date.toLocaleDateString(), dateForPicker : e})
    }

    const showItem = () => {
        return(
            <tr>
                <td className={"tableTextCenter"}>
                    {
                        dateDiff <= 7 ? 
                        <OverlayTrigger
                            key={"expireAlert"}
                            placement={"top"}
                            overlay={
                                <Tooltip id={`expireAlert`}>
                                Expires Soon.
                                </Tooltip>
                            }>
                            
                                <svg width="1.0625em" height="1em" viewBox="0 0 17 16" className="bi bi-exclamation-triangle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                                </svg>
                            </OverlayTrigger>
                        :
                            ""
                    }
                </td>
                <td>{values.name}</td>
                <td>{values.amount}</td>
                <td>{values.measurementUnit}</td>
                <td>{values.expiration}</td>

                <td className={"tableTextCenter"}><Button block size={"xxs"} variant={"light"} onClick={() => handleEditClick()}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg></Button>
                </td>
            </tr>
        )
    }

    const showEditItem = () => {
        return(
            <tr>
                <td className="tableTextCenter">
                {
                    dateDiff <= 7 ? 
                    <OverlayTrigger
                    key={"expireAlert"}
                    placement={"top"}
                    overlay={
                        <Tooltip id={`expireAlert`}>
                        Expires Soon.
                        </Tooltip>
                    }>
                        <svg width="1.0625em" height="1em" viewBox="0 0 17 16" className="bi bi-exclamation-triangle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                        </svg>
                    </OverlayTrigger>
                    :
                        ""
                }
                </td>
                <td><input className="storageEditInput" value={values.name} onChange={(e) => handleInputChange(e,"name")}></input></td>
                <td><input className="storageEditInput" value={values.amount} onChange={(e) => handleInputChange(e,"amount")}></input></td>
                <td><input className="storageEditInput" value={values.measurementUnit} onChange={(e) => handleInputChange(e,"measurementUnit")}></input></td>
                <td> <input type="date" className="storageEditInput" value={values.dateForPicker} onChange={(e) => handleDatePick(e.target.value)}></input>
                    {/*
                        <DatePicker selected={values.dateForPicker} onChange={date => handleDatePick(date)}/>
    */
                    }
                    </td>

                <td className={"tableTextCenter"} ><Button block variant={"success"} onClick={() => handleEditClick()}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    </Button>
                </td>

                <td className={"tableTextCenter"}><Button block variant={"danger"} onClick={() => handleDeleteClick()}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    </Button>
                </td>
            </tr>
        )
    }

    

    return(   
        
        values && edit.editing ?
            showEditItem()
        :
            showItem()
    

    )      
}

/*
<Card bg={getCardBg()}>    
             <Card.Header className={"d-flex justify-content-between pt-1 pb-1"} >
                <h5>{edit.editing ?
                        <Form >
                            <Form.Row>
                                <Col> 
                                    <Form.Control className={"text-sm"}  name="name" placeholder="Name" value={values.name} onChange={handleInputChange} />
                                </Col>
                            </Form.Row>
                        </Form>
                    :
                        item.name   
                }</h5>
                
                
                    {
                        edit.editing ? 
                            <Container className= {"text-right m-0"} >
                                <Button className={"mr-1"} variant={"dark"} size={"xxs"} onClick={() => handleDeleteClick()} >Delete</Button>
                                <Button className={"ml-1"} variant={"dark"} size={"xxs"} onClick={() => handleEditClick()} >Save</Button>
                            </Container>
                        :
                            <Button variant={"dark"} size={"xxs"} onClick={() => handleEditClick()} >Edit</Button>
                    }
                
                
                
            </Card.Header>
            <Card.Body className={"d-flex justify-content-between p-1"}>
            {
                edit.editing ? 
                    showEditItem()
                :
                    showItem()
            }   
           
           </Card.Body>
        </Card>*/

const mapStateToProps = (state, props) => {
    return {
   
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       //addItem: () => dispatch(addItem())
       editItem: (item) => dispatch(editItem(item)),
       deleteItem: (item) => dispatch(deleteItem(item))
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    //firestoreConnect([{}])
)(StorageItem)