import React from "react";
import {Button, ButtonGroup, Form} from "react-bootstrap";

const PlusMinusButton = (props) => {

    return (
        <div className="plusMinusBtn">
        <ButtonGroup aria-label="Basic example">
            <Button className="plusMinusBtn1" variant="secondary">-</Button>
            <Form.Control className="plusMinusBtn2" type="input" />
            <Button className="plusMinusBtn1" variant="secondary">+</Button>
        </ButtonGroup>
        </div>
    )

}

export default PlusMinusButton








