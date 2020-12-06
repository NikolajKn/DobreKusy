import React, { Children, useState } from "react";
import { Button, Modal } from 'react-bootstrap'
import Ingredients from "./Ingredients"
import FilteredRecipes from "./FilteredRecipes"
import { connect } from "react-redux"
import { compose } from "redux";
import './MenuDialog.css';
import { firestoreConnect } from "react-redux-firebase";
import MediaQuery from 'react-responsive'
import { useMediaQuery } from 'react-responsive'



const MenuModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); props.setNewFilter([]) }
  const handleShow = () => setShow(true);
  var day = props.day;
  var number = props.number;
  var selectedRecipe = "";
  var newMenu = props.menu1.newMenu




  const setRecipe = (recipe) => { selectedRecipe = recipe }

  return (
    <div>
      <Button variant="success" className="rounded-circle" style={{ marginBottom: "5px" }} onClick={handleShow}> + </Button>

      <Modal
        as="form"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="my-modal"


      >
        <Modal.Header as={"section"} style={{ backgroundColor: "#f0f1f2", padding: "20px" }}>
          <Modal.Title>{day}</Modal.Title>
          <Button variant="danger" onClick={handleClose} style={{ fontWeight: "bold" }}>x</Button>

        </Modal.Header>
        <Modal.Body className="bg-light" style={{ paddingTop: "0" }}>

          <MyScreenMid>
            <Ingredients></Ingredients>
            <FilteredRecipes set={setRecipe}></FilteredRecipes>

          </MyScreenMid>


          <MyScreenMax>



            <div className="float-left" style={{ margin: "0", width: "34%", marginTop: "5%", marginRight: "1%" }}>
              <Ingredients></Ingredients>

            </div>
            <div className="float-left" style={{ width: "64%", margin: "0", marginTop: "5%", marginRight: "1%" }}>

              <FilteredRecipes set={setRecipe}></FilteredRecipes>
            </div>



          </MyScreenMax>
        </Modal.Body>

        <MyScreenMax>
          <Modal.Footer as="footer" className="bg-light" style={{ justifyContent: 'center', border: "0", paddingLeft: "35%" }}>
            <Button variant="success" onClick={() => {
              var rec = []
              if (props.day == "monday") {
                rec = props.menu1.newMenu.monday
                rec.push({ recipe: selectedRecipe, portions: "5" })
                newMenu.monday = rec
              } else if (props.day == "tuesday") {
                rec = props.menu1.newMenu.tuesday
                rec.push({ recipe: selectedRecipe, portions: "5" })
                newMenu.tuesday = rec
              } else if (props.day == "wednesday") {
                rec = props.menu1.newMenu.wednesday
                rec.push({ recipe: selectedRecipe, portions: "5" })
                newMenu.wednesday = rec
              } else if (props.day == "thursday") {
                rec = props.menu1.newMenu.thursday
                rec.push({ recipe: selectedRecipe, portions: "5" })
                newMenu.thursday = rec
              } else if (props.day == "friday") {
                rec = props.menu1.newMenu.friday
                rec.push({ recipe: selectedRecipe, portions: "5" })
                newMenu.friday = rec
              }

              props.setNewMenu(newMenu)
              handleClose()
            }
            }

              style={{ width: "25%", fontSize: "20px" }}>Select</Button>
          </Modal.Footer>
        </MyScreenMax>
        <MyScreenMid>
          <Modal.Footer as="footer" className="bg-light" style={{ justifyContent: 'center', border: "0" }}>
            <Button variant="success" onClick={() => {
              var rec = []
              if (props.day == "monday") {
                rec = props.menu1.newMenu.monday
                rec.push({ recipe: selectedRecipe, portions: "5" })
                newMenu.monday = rec
              } else if (props.day == "tuesday") {
                rec = props.menu1.newMenu.tuesday
                rec.push({ recipe: selectedRecipe, portions: "5" })
                newMenu.tuesday = rec
              } else if (props.day == "wednesday") {
                rec = props.menu1.newMenu.wednesday
                rec.push({ recipe: selectedRecipe, portions: "5" })
                newMenu.wednesday = rec
              } else if (props.day == "thursday") {
                rec = props.menu1.newMenu.thursday
                rec.push({ recipe: selectedRecipe, portions: "5" })
                newMenu.thursday = rec
              } else if (props.day == "friday") {
                rec = props.menu1.newMenu.friday
                rec.push({ recipe: selectedRecipe, portions: "5" })
                newMenu.friday = rec
              }

              props.setNewMenu(newMenu)
              handleClose()
            }
            }

              style={{ width: "25%", fontSize: "20px" }}>Select</Button>
          </Modal.Footer>
        </MyScreenMid>

      </Modal>
    </div>
  );
}

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}
const MyScreenMid = ({ children }) => {
  const isDesktop = useMediaQuery({ maxWidth: 1200 })
  return isDesktop ? children : null
}
const MyScreenMax = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 })
  return isDesktop ? children : null
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
  connect(mapStateToProps, mapDispatchToProps),
  //firestoreConnect([{}])
)(MenuModal)
