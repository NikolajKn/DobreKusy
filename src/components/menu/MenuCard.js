import React from 'react'
import {Card, Button, Row, Col} from "react-bootstrap"
import {imgWarning, imgCheck, imgCross, imgTrash} from "./commonElements/Icons"
import {tooltipBasic} from "./commonElements/TooltipBasic"
import {connect} from "react-redux";
import {compose} from "redux";
import {editItem} from "../../store/actions/menuActions"


const MenuCard = (props) => {
        const second5day = 432000;
        var usingDate = props.menu.date.seconds
        var author= props.menu.author
        var creatingDate= props.menu.creatingDate.seconds
        var state= props.menu.state

        var date = new Date(usingDate*1000)
        var date1 = new Date((usingDate + second5day) * 1000)
        var creatingDate = new Date(creatingDate*1000)

        return(
            <article>
                <Card bg="Light" style={{marginBottom: "30px"}}>
                    <Card.Header className="menuCardHeader">
                    <Row className="align-items-center">
                    
                        <Col sm={11}>
                            {
                            state === "2" ? <Button variant="warning" className="sendBtn" data-index = {props.index} onClick={(e) => {
                                var clone = JSON.parse(JSON.stringify(props.menu));
                                clone["state"] = "1";
                                props.editItem(clone, e.target.dataset.index);
                            }}><span data-index = {props.index} className="sendBtn1">Send for approval</span></Button>
                            : state === "1" ? 
                                tooltipBasic("Waiting for approval", imgWarning(), "warning")
                    
                            : state === "0" ?
                                tooltipBasic("Approved!", imgCheck(), "approve")
                            : 
                                tooltipBasic("Declined!", imgCross(), "delete")
                            
                            }
                            <Button className="btnNameMenu" data-index = {props.index} 
                            onClick={(e)=> props.setActualMenu(e.target.dataset.index)}>
                                {date.toLocaleDateString()} - {date1.toLocaleDateString()}
                            </Button>
                        </Col>
                        {
                            props.sidebar ? null
                            :
                            <Col sm={1} style={{padding:"0px 0px 0px 0px"}}>
                            <Button variant="danger" className="d-flex justify-content-center btnDelete" style={{width:"50px", height:"50px"}} >
                                {imgTrash()}
                            </Button>
                            </Col>
                        }
                    </Row>
                    </Card.Header>
                    <Card.Body className="menuCardFooter">
                        {author}, {creatingDate.toLocaleDateString()}
                    </Card.Body>
                </Card>

            </article>
        )
}

const mapStateToProps = (state, props) => {
    return {
        menuX: state.menu
    }
}

const setActualMenu = (id) => {
    return {
        type: "SET_ACTUAL_MENU", 
        payload: id
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
       //addItem: () => dispatch(addItem())
       editItem: (item, index) => dispatch(editItem(item, index)),
       setActualMenu: (id) => dispatch(setActualMenu(id)) 
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    //firestoreConnect([{}])
)(MenuCard)

