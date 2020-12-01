import React,{Component} from "react";
import {Button,Card,Col,InputGroup,FormControl, Form,Dropdown} from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead';
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";

import {addItem} from "../../store/actions/recipeActions"

class Ingredients extends Component{
    
    constructor(props){
      super(props);
      this.ingredients1 = []
      this.props.storage && Object.keys(this.props.storage).map((ing, index) => 
        {
          this.ingredients1.push(this.props.storage[ing].name)
        }  
      )      
      this.expiration1 = []
      this.props.storage && Object.keys(this.props.storage).map((ing, index) => {
            var itemDate = new Date(this.props.storage[ing].expirationDate.seconds*1000)
            var currentDate = new Date(Date.now())
            var dateDiff =  Math.floor(( itemDate - currentDate ) / 86400000);  
            if(dateDiff <= 7){
              this.expiration1.push(this.props.storage[ing].name)
            }
        }  
      )

      console.log(this.props.storage)
      this.state = {
        expiration: this.expiration1,
        checked:[-1,-1,-1],
        filterBox:[],
        filterText:{},
        ind:0,
        ingredients: this.ingredients1,
        current:null,
       };
    }

    componentDidMount() {
      this.setState({ingredients:this.ingredients1})
      this.setState({expiration:this.expiration1})
    }

    handleClick = () => {
        var newFilterText = this.state.filterText
        newFilterText["t"+this.state.ind]=""
        this.setState({filterText:newFilterText})
        this.setState({ind:this.state.ind+1})
        
      }

      handleClick2 = (e) => {

        var index = "t"+e.target.id.replace("b","");
        var newFilterText = this.state.filterText;
        delete newFilterText[index];
        this.setState({filterText:newFilterText})
        console.log(this.state.filterText)
        
      }

     

      onChangeCheckbox = (e) =>{
        var index = e.target.id.replace("e","")
        if(this.state.checked[index]==-1){
          this.state.checked[index]=0
          console.log("zapnute")

        var newFilter = this.state.filterBox
        newFilter.push(this.state.expiration[index])
        this.setState({filter:newFilter})

        }
        else{
          this.state.checked[index]=-1
          var newFilter = this.state.filterBox.filter(item => item !== this.state.expiration[index])
          this.setState({filter: newFilter});
        }
      }

    


      onInputChangeTextType = (value,event) =>{
        console.log("tu")
        console.log(value)
        console.log(event)
        var name = event.target.id;
        var val = value;
        var newFilterText = this.state.filterText;
        newFilterText[name] = val
        this.setState({filterText:newFilterText})
        console.log(this.state.filterText)
        


      }

      
      onFocusTextType = (e) =>{
        console.log(e.target.id)
        var newCurrent = e.target.id
        this.setState({current:newCurrent})
      }
      

      onChangeTextType = (value) =>{
        console.log("tu")
        console.log(value)
        
        var name = this.state.current;
        var val = value;
        var newFilterText = this.state.filterText;
        newFilterText[name] = val
        this.setState({filterText:newFilterText})
        console.log(this.state.filterText)
        


      }
      

    render(){
      console.log("XXXXXXXXx")
      console.log(this.state.expiration)
      console.log(this.state.expiration === undefined)
      if(this.state.expiration === undefined || this.state.expiration.length == 0){
        return <div>LOAD</div>
      } else{
        return(
          <Card style = {{borderColor:"#64697A"}}>
              <Card.Header style={{ backgroundColor: '#64697A', color:'white'}}> 
              <h4 className="float-left" style={{width:"50%"}}>Select ingredients for recipe:</h4>
              <div className="float-right" style={{width:"50%"}}>
              <Button  className="float-right" variant="success">Apply filter</Button>
              </div>
              </Card.Header>
  
              <Card.Body style= {{overflow: "auto", height:"200px"}}>
  
              <Button className="rounded-circle" variant="success" style={{ fontWeight:'bold'}} onClick={this.handleClick}>+</Button>
                
                {
                Object.entries(this.state.filterText).reverse().map(([k, v]) => (
                  <div key={k}>
  
                <Typeahead
                         className="float-left"
                         style={{ marginTop:"10px",width:"70%" }}
                         options={this.state.ingredients}
                          id = {"typeahead"+k}
                          positionFixed 
                          inputProps={{id: k}}
                          onInputChange = {this.onInputChangeTextType}
                          onFocus = {this.onFocusTextType}
                          onChange = {this.onChangeTextType}
                          placeholder = {"Search ingredient"}
                          
                          
                        />
                    
  
                    <Button
                          className="float-right"
                          className="rounded-circle"
                          variant = "danger" 
                          id = {"b"+k.replace("t","")}
                          style={{ marginTop:"10px",marginLeft:"10px", fontWeight:"bold" }}
                          onClick={this.handleClick2}>x</Button>
                  </div>
  
  
  
                  
                ))}
            
  
  <div style={{marginTop:"10px"}}>
                {this.state.expiration.map((value, index) => 
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label= {value+" (expiration)"}
                      name="formHorizontalRadios"
                      id={"e"+index}
                      onChange = {this.onChangeCheckbox}
                      style = {{fontSize: "20px", color:"red"}}
                    />
            ) }
  
  </div>
  
  {
    Object.entries(this.state.filterText).map(([k, v]) =>(
      <p key={k}>
        {k} : {v}
      </p>
    ))
  }
  
  
  
                  
                
              </Card.Body>
            </Card>
  
          )
      }

    }
    
    

}

const mapStateToProps = (state, props) => {
  return {
      storage: state.firestore.data.storage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     addItem: () => dispatch(addItem())
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{collection:"storage"}])
)(Ingredients)
