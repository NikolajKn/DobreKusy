import React,{ Children, useState }  from "react";
import {Button,Modal} from 'react-bootstrap'
import Ingredients from "./Ingredients"
import FilteredRecipes from "./FilteredRecipes"



const MenuModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var day = props.day;
    var number = props.number;
    var selectedRecipe = "";

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
         <Modal.Title>{day} - {number}.recipe</Modal.Title>
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
                    <Button variant="success" onClick={() => {props.add(selectedRecipe); setShow(false)}} style = {{width:"25%", fontSize:"20px"}}>Select</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

  export default MenuModal