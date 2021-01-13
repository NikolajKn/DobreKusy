import React,{Component} from "react";
import {Button,Card,Col,InputGroup,FormControl, Form,Dropdown} from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead';
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
import {addItem} from "../../store/actions/recipeActions"

var expirujuce =[];
var suroviny =[];
var oznaceneExp =[];
var oznaceneNexp =[];
var neexpirujuce =[];
var pomfilter = []

class Ingredients extends Component{
    
    constructor(props){
        super(props);
        suroviny =props.storage 
        console.log(props.storage)
        console.log(suroviny)
      this.state = {
        checked:[],
       };
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps){
            expirujuce =[];
            neexpirujuce =[];
            var pomoc =[];
           
            this.props.menuState.expiringIngredients && Object.keys(this.props.menuState.expiringIngredients).map((ing, index) => 
            {  pomoc =[]
                pomoc.push(ing)
                pomoc.push(this.props.menuState.expiringIngredients[ing][0])
                pomoc.push(this.props.menuState.expiringIngredients[ing][1])
                if(pomoc[1]>0){
                    expirujuce.push(pomoc)
                }
            }
        )
            this.props.menuState.otherIngredients && Object.keys(this.props.menuState.otherIngredients).map((ing, index) => 
            {  pomoc =[]
                pomoc.push(ing)
                pomoc.push(this.props.menuState.otherIngredients[ing][0])
                pomoc.push(this.props.menuState.otherIngredients[ing][1])
                if(pomoc[1]>0){
                    neexpirujuce.push(pomoc)
                }
            }
       )

            if (this.state.checked.length == 0) {
                oznaceneExp = []
                oznaceneNexp=[];
                for(let i = 0; i < expirujuce.length; i++){
                    oznaceneExp.push(false)
                }
                for(let i = 0; i < neexpirujuce.length; i++){
                    oznaceneNexp.push(false)
                }
                this.setState({ checked: oznaceneExp })
            }  
            console.log(expirujuce)
        
        }      
    }

   

 expiruju = (e) =>{
     var index = e.target.id
     if(index===""){
         index=0;
     }
     
            if(oznaceneExp[index]==false){ 
                oznaceneExp[index] = true
            }
            else{
                oznaceneExp[index] = false
            }
            this.filtruj()
        }

  neexpiruju = (e) =>{    
      var index = e.target.id 
      if(index===""){
          index=0;
      }
            if(oznaceneNexp[index]==false){       
                oznaceneNexp[index] = true
            }
            else{
                oznaceneNexp[index] = false
            }
            this.filtruj()
        }

 filtruj = () => {
            pomfilter = []
            for (let i = 0; i < oznaceneExp.length; i++) {
                if (oznaceneExp[i] == true) {
                    pomfilter.push(expirujuce[i][0])
                }
            }
            for (let i = 0; i < oznaceneNexp.length; i++) {
                if (oznaceneNexp[i] == true) {
                    console.log(neexpirujuce[i][0])
                    pomfilter.push(neexpirujuce[i][0])
                }
            }
            this.props.setNewFilter(pomfilter)
    }  

    render(){
        return(
            <>
          <Card style = {{borderColor:"#64697A",padding:"0",margin:"0",border:"0",borderRadius:"0px"}}>
              <Card.Header style={{ backgroundColor: '#64697A', color:'white',borderRadius:"0px"}}> 
              <h4 className="float-left" style={{width:"100%"}}>Close to expire:</h4>
              
              </Card.Header>
  
              <Card.Body style= {{overflow: "auto", height:"190px"}}>
                
  <div style={{marginTop:"10px"}}>
  
  {expirujuce.map((value, index) => 
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label= {expirujuce[index][0]+ " "+ expirujuce[index][1] +" "+ expirujuce[index][2]  }
                      name="formHorizontalRadios"
                      id={index}
                      onChange = {this.expiruju}
                      style = {{fontSize: "20px", color:"red"}}
                    />
            ) }
  
  </div>
              </Card.Body>
            </Card>

            <Card style = {{borderColor:"#64697A",borderRadius:"0px",border:"0"}}>
             <Card.Header style={{ backgroundColor: '#64697A', color:'white',borderRadius:"0px"}}> 
              <h4 className="float-left" style={{width:"100%"}}>Other ingredients:</h4>
              
              </Card.Header>
  
              <Card.Body style= {{overflow: "auto", height:"180px"}}>
                <div style={{marginTop:"10px"}}>
  
                {neexpirujuce.map((value, index) => 
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label= {neexpirujuce[index][0]+ " "+ neexpirujuce[index][1] +" "+ neexpirujuce[index][2]  }
                      name="formHorizontalRadios"
                      id={index}
                      onChange = {this.neexpiruju}
                      style = {{fontSize: "20px"}}
                    />
            ) }
  
  </div>
             
                  </Card.Body>
            </Card>
  </>
          )


    }
    
    

}


const setNewFilter = (filter) => {
  return {
      type: "SET_FILTER", 
      payload: filter
  }
}

const mapStateToProps = (state, props) => {
  return {
      storage: state.firestore.ordered.storage,
      menuState: state.menu
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewFilter: (filter) => dispatch(setNewFilter(filter)),
    addItem: () => dispatch(addItem())
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{collection:"storage"}])
)(Ingredients)
