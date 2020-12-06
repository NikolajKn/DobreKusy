import React,{ useState} from "react";
import {Alert, Button, Row, Col} from "react-bootstrap"

const AlertAfterAction = (props) => {
    const [show, setShow] = useState(true);
    console.log("ROBIM") 

    if (show) {
      return (
        <Alert variant={props.variant} onClose={() => props.setting(false)} dismissible>
          <p style={{fontWeight:"bold", fontSize:"150%"}}>
            {props.text}
          </p>
          <div style={{textAlign:"center"}}>
          <Button variant="success" style={{marginRight:"1%", fontWeight:"bold", width:"10%"}} onClick={(e) => {props.delete(true); console.log("MAZEM") }}>Yes</Button>
          <Button variant="danger" style={{marginLeft:"1%", fontWeight:"bold", width:"10%"}} onClick={(e) => {props.setting(false)}}>No</Button>
          </div>
        </Alert>
      );
    }
    return null;
  }
  
  export default AlertAfterAction
