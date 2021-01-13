import React,{Component} from "react";
import {InputGroup,Card,FormControl,Button,Form} from 'react-bootstrap';
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
import {addItem} from "../../store/actions/recipeActions"
import { useMediaQuery } from 'react-responsive'
import Ingredients from "./Ingredients"

var recepty = [];
var hladaj ="";
var vybranyrecept=null
var oznaceny = null;
var filtrovanie = false;
var sklad =[];
var filterRecipes = []
var ingrediencesklad=[];


class FilteredRecipes extends Component{
    
    constructor(props){
        super(props);
        console.log(this.props.recipes)
        recepty = this.props.recipes
       // sklad = this.props.storage
       // console.log(sklad)
        console.log(this.props.storage)
        console.log(recepty)
        oznaceny = null;
        vybranyrecept=null;
        ingrediencesklad=[];
        this.state = {       
            selectedRadioId:null,
            
        };
    }
    componentDidUpdate(prevProps) {
        if(this.props !== prevProps){
            var pomoc =[];
            sklad=[];
            this.props.menuState.expiringIngredients && Object.keys(this.props.menuState.expiringIngredients).map((ing, index) => 
            {  pomoc =[]
            pomoc.push(ing)
            if(this.props.menuState.expiringIngredients[ing][0]<=0){
                pomoc.push(0)
            }
            else{
                pomoc.push(this.props.menuState.expiringIngredients[ing][0])
            }
            pomoc.push(this.props.menuState.expiringIngredients[ing][1])              
             sklad.push(pomoc)
               
            }
       )
            this.props.menuState.otherIngredients && Object.keys(this.props.menuState.otherIngredients).map((ing, index) => 
            {  pomoc =[]
                pomoc.push(ing)
                if(this.props.menuState.otherIngredients[ing][0]<=0){
                    pomoc.push(0)
                }
                else{
                    pomoc.push(this.props.menuState.otherIngredients[ing][0])
                }
                pomoc.push(this.props.menuState.otherIngredients[ing][1])            
                sklad.push(pomoc)
                
            }
       )
        }
    }

    oznacRecept = (e) =>{
        filtrovanie = true;
        var newSelected = e.target.dataset.recipe;
        oznaceny = e.target.id;
        this.setState({ selectedRadioId: oznaceny });
        for(let i=0;i<recepty.length;i++){
            if(recepty[i].name == newSelected){
                this.props.set(recepty[i].id)
                vybranyrecept=recepty[i]
                console.log(vybranyrecept)
                console.log(vybranyrecept.ingredients)
               
            }  
        }
        this.skladd();
    }

        skladd =()=>{
            var pom = false;
            var pole =[]
            var cislo = 0;
            var jednotka =0;
            ingrediencesklad=[];
            for(let i=0;i<vybranyrecept.ingredients.length;i++){
                
                for(let j=0;j<sklad.length;j++){
                    jednotka =0;
                    pom = true 
                    if(sklad[j][0]==vybranyrecept.ingredients[i].name){

                        for(let k=0;k<ingrediencesklad.length;k++){
                            if(ingrediencesklad[k][0]==sklad[j][0]){
                                console.log(ingrediencesklad[k][1])
                                console.log(sklad[j][1])
                                jednotka= parseInt(sklad[j][1])
                                if(sklad[j][2] =="kg"){
                                    jednotka= parseInt(sklad[j][1])*1000
                                }
                                if(sklad[j][2] =="l"){
                                    jednotka= parseInt(sklad[j][1])*1000
                                }
                                cislo = ( parseInt(ingrediencesklad[k][1]) + jednotka)
                                console.log(cislo)
                                ingrediencesklad[k][1] = cislo
                                cislo = 0;
                                pom = false
                                break;
                            }

                            
                        }
                        if(pom){
                            pole.push(sklad[j][0])
                            if(sklad[j][2]=="kg" || sklad[j][2]=="l"){
                                jednotka= parseInt(sklad[j][1])*1000
                                pole.push(jednotka)
                                if(sklad[j][2]=="kg"){    
                                    pole.push("g")
                                }
                                else{
                                    pole.push("ml")
                                }
                                
                            }
                            else{
                                pole.push(sklad[j][1])
                                pole.push(sklad[j][2])
                            }
                            
                            ingrediencesklad.push(pole)
                            pole=[];
                        }
                    }
                    
              }
         }
            console.log(ingrediencesklad)     
            }

            
        

    zapis = (e) =>{
   
        hladaj = e.target.value;   
        this.setState({selectedRadioId:null});
        oznaceny = null;
        vybranyrecept=null;
     
        
    }

    render(){ 
        filterRecipes = []
        if(this.props.menuState.filterIngredients.length == 0){
            for(let i=0;i<recepty.length;i++){
                filterRecipes.push(recepty[i].name)
               
            }
            if(filtrovanie==false){
                oznaceny =null;
                vybranyrecept=null;
            }
            filtrovanie = false;
        } else{
            
            if(filtrovanie==false){ 
                oznaceny=null;
                vybranyrecept=null;
            }
            filtrovanie = false;
            var arrIngr = this.props.menuState.filterIngredients;
            for(let i = 0; i < recepty.length; i++){
                var name = recepty[i].name
                var recipeIngredients = []
               
                for(let j = 0; j < recepty[i].ingredients.length; j++){
                    if(recepty[i].ingredients[j]){
                        recipeIngredients.push(recepty[i].ingredients[j].name)
                    }
                }
                var correct = true
                for(let j = 0; j < arrIngr.length; j++){
                    if(!recipeIngredients.includes(arrIngr[j])){
                        correct = false
                    }
                }
                if(correct){
                    filterRecipes.push(name)
                }
            }
            
            
        }
        return(
<>

        <Card style = {{borderColor:"#64697A"}}>

            <Card.Header style={{ backgroundColor: '#64697A', color:'white',  }}>
                        <h4 className="float-left" style={{width:"50%"}}>Choose recipe:</h4>
                            <Form.Control
                            className="float-right" style={{width:"50%"}}
                            type= "text"
                            placeholder="Search recipe"
                            id = "filterRecipe"
                            onChange = {this.zapis}
                            />
            </Card.Header>

            <Card.Body style = {{overflow: "auto", height:"490px",padding:"0",margin:"0"}}>

                <Card className="float-left" style = {{borderColor:"#64697A",paddingTop:"0",marginTop:"0",width:"55%",borderRadius:"0px"}}>     
                    <Card.Body  style = { this.props.isSmall ? {overflow: "auto", height:"280px"}: {overflow: "auto", height:"250px"}}>
                
                        {filterRecipes.filter((data)=>{
                        if(hladaj == null)
                            return data
                        else if(data.toLowerCase().includes(hladaj.toLowerCase())){
                            return data
                        }
                        }).map((recipe,index)=> 
                        <Form.Check 
                             key={index}
                               type="radio" 
                               label={recipe} 
                               id = {index} 
                               checked={oznaceny == index}
                               name ="recipe"
                               data-recipe={recipe}
                               onChange = {this.oznacRecept}
                               style = {{fontSize:"20px"}}
                                />
                      )}
                   
                 </Card.Body>
               </Card>

              <Card className="float-left" style = {{borderColor:"#64697A",padding:"0",margin:"0",borderRadius:"0px",width:"55%"}}>
                    <Card.Header style={{ backgroundColor: '#64697A', color:'white',borderRadius:"0px"}}> 
                        <h4  style={{width:"90%"}}>Recipe ingredients:</h4>
              
                     </Card.Header>

                    <Card.Body style= {{overflow: "auto", height:"180px",padding:"0",margin:"0"}}>

                          <Card   style = { this.props.isSmall ? {borderColor:"#64697A",borderRadius:"0px",padding:"0",margin:"0"}:
                         {borderColor:"#64697A",width:"50%",borderRadius:"0px",padding:"0",margin:"0",float:"left"}}>
                                <Card.Header style={{ backgroundColor: '#64697A', color:'white',borderRadius:"0px"}}> 
                                    <h4 className="float-left" style={{width:"100%" }}>One portion</h4>
              
                                </Card.Header>
  
                                <Card.Body style= {{height:"150px"}}>
                                         { oznaceny== null ? <div> </div> :
                                            <div style={{marginTop:"0px"}}>
                                            {vybranyrecept.ingredients.map((value, index) => 
                                            <p style = {{fontSize: "20px", padding:"0",margin:"0"}}>  {vybranyrecept.ingredients[index].name +" " +vybranyrecept.ingredients[index].amount + vybranyrecept.ingredients[index].measurementUnit  }</p>                                                 
                                                              
                                              ) }
                                                </div>
                                                            }
                               </Card.Body>
                          </Card>


                          <Card  style = {{borderColor:"#64697A",padding:"0",margin:"0",borderRadius:"0px"}}>
                                <Card.Header style={{ backgroundColor: '#64697A', color:'white',borderRadius:"0px"}}> 
                                     <h4 className="float-left" style={{width:"50%",whiteSpace: "nowrap"}}>Storage</h4>
              
                                 </Card.Header>
  
                                 <Card.Body style= {{height:"150px"}}>
                                         { oznaceny== null ? <div> </div> :
                                         <div style={{marginTop:"0px"}}>
                                         {ingrediencesklad.map((value, index) => 
                                        <p style = {{fontSize: "20px", padding:"0",margin:"0"}}>  {ingrediencesklad[index][0] +" " +ingrediencesklad[index][1] + ingrediencesklad[index][2]  }</p>
                                                                                                                             
                                        ) }
  
                                        </div>
                                                }
                                </Card.Body>
                          </Card>                                   

          </Card.Body>
           </Card>
             
            <Ingredients></Ingredients>

            
  </Card.Body>
 </Card>
  </>    
        )
    }
}


  
const mapStateToProps = (state, props) => {
    return {
        recipes: state.firestore.ordered.recipes,
        storage: state.firestore.ordered.storage,
        menuState: state.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       addItem: () => dispatch(addItem())
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"storage"},{collection:"recipes"}])
)(FilteredRecipes)