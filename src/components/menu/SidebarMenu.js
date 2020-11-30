import React, {Component} from 'react'
import {Col, Row, Container, Card, Button, Table} from "react-bootstrap"
import {imgWarning, imgCheck, imgCross, imgDelete, imgTrash} from "./commonElements/Icons"
import {tooltipBasic} from "./commonElements/TooltipBasic"

class AllMenu extends Component{

    constructor(props){
        super(props);
    }

    render(){
        var allMenu = JSON.parse(localStorage.getItem("allMenu"));

        return(
            <Container>
                {allMenu.map((menu, index) => 
                    <article key={index}>
                        <Card border="light" style={{marginBottom: "30px"}}>
                                            <Card.Header className="menuCardHeader">
                                            <Row>
                                            
                                                <Col sm={11}>
                                                    {
                                                        menu[5] === "x" ? <Button variant="warning" className="sendBtn" onClick={() => {
                                                            var menu = JSON.parse(localStorage.getItem("allMenu"));
                                                            var menu1 = menu[index];
                                                            menu1[menu1.length - 1] = null;
                                                            menu[index] = menu1;
                                                            localStorage.setItem("allMenu", JSON.stringify(menu));
                                                        }}>Send to manager</Button>
                                                        : menu[5] ? 
                                                                tooltipBasic("Approved!", imgCheck(), "approve")
                                                        : menu[5] == null ? //"Waiting for approval"
                                                                tooltipBasic("Waiting for approval", imgWarning(), "warning")
                                                        : 
                                                                tooltipBasic("Declined!", imgCross(), "delete")
                                                    }

                                                    <Button variant="link">
                                                        {menu[1]}
                                                    </Button>

                                                </Col>
                                            </Row>
                                            </Card.Header>
                                            
                                            <Card.Footer className="menuCardFooter">
                                                {menu[2]}, {menu[3]}
                                            </Card.Footer>
                                        </Card>

                    </article>
                )}
            </Container>

        )
    }
}

export default AllMenu