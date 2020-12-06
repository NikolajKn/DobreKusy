import React,{Component} from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


class Footer extends Component {
    
    constructor(props){
        super(props);
    }
     
    render(){
        return(
        
        <footer className = "footer" >
<Container >

<Row>
    <Col >
    <a href="home"  >Storage Master
    
    </a>
</Col>
    <Col>Dobre Kusy, Comenius University in Bratislava</Col>
 <Col>
 
 <a href = "mailto: dobrekusy@gmail.com"> dobrekusy@gmail.com</a></Col>
  </Row>
  <Row>
      <Col></Col>
      <Col><small>&copy; Copyright 2020, Dobre Kusy</small></Col>
      <Col></Col>
  </Row>
  </Container>

        
            
        

  
</footer>
        )
    

}
}

export default Footer