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

      this.state = {
        expiration: [],
        checked:[],
        filterBox:[],
        filterText:{},
        ind:0,
        ingredients: [],
        current:null,
       };
    }

    componentDidUpdate(prevProps) {
      if(this.props !== prevProps){
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
        var chec = []
        for(let i = 0; i < this.expiration1.length; i++){
          chec.push(-1)
        }
        this.setState({checked:chec})
        this.setState({ingredients:this.ingredients1})
        this.setState({expiration:this.expiration1})
      }
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
        
      }

      onChangeCheckbox = (e) =>{
        var index = e.target.id.replace("e","")
        if(this.state.checked[index]==-1){
          this.state.checked[index]=0

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

        var name = event.target.id;
        var val = value;
        var newFilterText = this.state.filterText;
        newFilterText[name] = val
        this.setState({filterText:newFilterText})
  
      }

      
      onFocusTextType = (e) =>{
        var newCurrent = e.target.id
        this.setState({current:newCurrent})
      }
      

      onChangeTextType = (value) =>{

        
        var name = this.state.current;
        var val = value;
        var newFilterText = this.state.filterText;
        newFilterText[name] = val
        this.setState({filterText:newFilterText})
        
      }
      

    render(){
        return(
          <Card style = {{borderColor:"#64697A"}}>
              <Card.Header style={{ backgroundColor: '#64697A', color:'white'}}> 
              <h4 className="float-left" style={{width:"50%"}}>Select ingredients for recipe:</h4>
              <div className="float-right" style={{width:"50%"}}>
              <Button  className="float-right" variant="success" onClick={(e)=> {
                              var arrayFilter = this.props.menuState.filterIngredients
                              for(let i = 0; i < this.state.checked.length; i++){
                                if(this.state.checked[i] == 0){
                                  arrayFilter.push(this.state.expiration[i])
                                }
                              }
                              for (const [key, value] of Object.entries(this.state.filterText)) {
                                if(Array.isArray(value)){
                                  arrayFilter.push(value[0]);
                                } else {
                                  arrayFilter.push(value);
                                }
                              }
                              this.props.setNewFilter(arrayFilter)
                            }}>Apply filter</Button>
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
              </Card.Body>
            </Card>
  
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
      storage: state.firestore.data.storage, 
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
