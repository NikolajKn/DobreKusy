import React,{ Children, useState }  from "react";
import {Button,Modal} from 'react-bootstrap'
import Ingredients from "./Ingredients"
import FilteredRecipes from "./FilteredRecipes"
import { connect } from "react-redux"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";


const MenuModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);props.setNewFilter([])}
    const handleShow = () => setShow(true);
    var day = props.day;
    var number = props.number;
    var selectedRecipe = "";
    var newMenu = props.menu1.newMenu

    
    

    const setRecipe = (recipe) => {selectedRecipe = recipe}

    return (
      <>
        <Button variant="success" className="rounded-circle" style={{marginBottom:"5px"}} onClick={handleShow}> + </Button>
        
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          style={{}}
        >
          <Modal.Header  style={{ backgroundColor: '#64697A', color:'white',padding:"20px"}}>
         <Modal.Title>{day}</Modal.Title>
         <Button variant="danger" onClick={handleClose} style={{fontWeight:"bold"}}>x</Button>
        
          </Modal.Header> 
          <Modal.Body style={{paddingTop:"0"}}>
          <div style={{marginTop:"20px"}}>
            <Ingredients></Ingredients>
          </div>
            <div style={{marginTop:"20px"}}>
            <FilteredRecipes set={setRecipe}></FilteredRecipes>
            </div>    
            
          </Modal.Body>
          <Modal.Footer style = {{justifyContent:'center'}}>
                    <Button variant="success" onClick={() => {
                      var rec = []
                      if(props.day == "monday"){
                        rec = props.menu1.newMenu.monday
                        console.log("MONDAY")
                        console.log(props.menu1.newMenu.monday)
                        rec.push({recipe:selectedRecipe,portions:"5"})
                        newMenu.monday = rec
                      } else if(props.day == "tuesday"){
                        rec = props.menu1.newMenu.tuesday
                        rec.push({recipe:selectedRecipe,portions:"5"})
                        newMenu.tuesday = rec
                      } else if(props.day == "wednesday"){
                        rec = props.menu1.newMenu.wednesday
                        rec.push({recipe:selectedRecipe,portions:"5"})
                        newMenu.wednesday = rec
                      } else if(props.day == "thursday"){
                        rec = props.menu1.newMenu.thursday
                        rec.push({recipe:selectedRecipe,portions:"5"})
                        newMenu.thursday = rec
                      } else if(props.day == "friday"){
                        rec = props.menu1.newMenu.friday
                        rec.push({recipe:selectedRecipe,portions:"5"})
                        newMenu.friday = rec
                      }
                      
                      props.setNewMenu(newMenu)
                      handleClose()}
                    } 
                      
                    style = {{width:"25%", fontSize:"20px"}}>Select</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

  

const mapStateToProps = (state, props) => {
    return {
        menu1: state.menu
    }
}

const setNewMenu = (menu) => {
    return {
        type: "PUSH_RECIPES", 
        payload: menu
    }
}

const setNewFilter = (filter) => {
  return {
      type: "SET_FILTER", 
      payload: filter
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
       //addItem: () => dispatch(addItem())
       setNewMenu: (menu) => dispatch(setNewMenu(menu)),
       setNewFilter: (filter) => dispatch(setNewFilter(filter))
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    //firestoreConnect([{}])
)(MenuModal)
