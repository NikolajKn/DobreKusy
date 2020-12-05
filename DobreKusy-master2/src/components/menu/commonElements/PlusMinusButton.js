import React,{ useState} from "react";
import {Button, ButtonGroup, Form} from "react-bootstrap";

const PlusMinusButton = (props) => {
    const [portions,setPortions] = useState(10);
    
    const handleOnChange = (e) => {
        
            console.log(e.target.value)
            setPortions(e.target.value)
    };

     
    return (
        
        <div className="plusMinusBtn">
        <ButtonGroup aria-label="Basic example">
            <Button className="plusMinusBtn1" variant="secondary" onClick={() => {
                                if(Number(portions)>0){
                                    setPortions(Number(portions) - 1)
                                }
                            }} >-</Button>
            <Form.Control className="plusMinusBtn2" type="number"  min="0" pattern="[0-9]*" value = {portions} onChange ={handleOnChange}/>
            <Button className="plusMinusBtn1" variant="secondary" onClick={() => setPortions(Number(portions) + 1) }>+</Button>
        </ButtonGroup>
        </div>
    )

}

export default PlusMinusButton








