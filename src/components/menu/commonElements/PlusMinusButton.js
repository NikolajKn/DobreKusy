import React,{ useState} from "react";
import {Button, ButtonGroup, Form} from "react-bootstrap";

const PlusMinusButton = (props) => {
    const [portions,setPortions] = useState(props.oldMenu[props.day][props.index].portions);
    
    const handleOnChange = (e) => {
            console.log(e.target.value)
            setPortions(e.target.value)
            changePortionsInState(e.target.value)
    };

    const changePortionsInState = (number) => {
        console.log("OLD MENU")
        console.log(props.oldMenu)
        var newMenu = {...props.oldMenu}
        var recipesInDay = props.oldMenu[props.day][props.index].portions
        recipesInDay = number
        newMenu[props.day][props.index].portions = recipesInDay
    }

     
    return (
        
        <div className="plusMinusBtn">
        <ButtonGroup aria-label="Basic example" data-index = {props.index} id={props.index}>
            <Button className="plusMinusBtn1" variant="secondary" onClick={() => {
                                if(Number(props.oldMenu[props.day][props.index].portions)>0){
                                    setPortions(props.oldMenu[props.day][props.index].portions*1 - 1); changePortionsInState(props.oldMenu[props.day][props.index].portions*1 - 1)                              
                                }
                            }} >-</Button>
            <Form.Control className="plusMinusBtn2" type="number"  min="0" pattern="[0-9]*" value = {props.oldMenu[props.day][props.index].portions} onChange ={handleOnChange}/>
            <Button className="plusMinusBtn1" variant="secondary" onClick={() => {setPortions(props.oldMenu[props.day][props.index].portions*1 + 1); changePortionsInState(props.oldMenu[props.day][props.index].portions*1 + 1)} }>+</Button>
        </ButtonGroup>
        </div>
    )

}

export default PlusMinusButton








