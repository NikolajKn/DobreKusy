import React from "react";
import {Container, Row, Col, Button,Table} from "react-bootstrap";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
import {connect} from "react-redux";
import logo from './logo.png';
import firebase from "firebase"
import { useState } from "react";
import HomeItem from "./HomeItem"
import Menu from "../menu/MenuDetail";
import './styles.css'

var mili = Date.now() +(86400*7*1000)
var currentDate = new Date(mili) 
var dat = Date.now()
var endofMenuDate = Date.now() 
var datum = new Date(Date.now()).toLocaleDateString();

const Home = (props) => {
    var {storage,men} = props
    
    console.log(men)
    console.log(storage)
    
    {
        men===undefined ?
        console.log("nenajdeny"): console.log(men[0].id)
    }

   
        
    const datumCheck = () =>{
        const pom = new Date(dat);
        const day = pom.getDay()
        if(day == 2){
            endofMenuDate= endofMenuDate- (86400*2*1000)
        }
        if(day == 3){
            endofMenuDate= endofMenuDate- (86400*2*1000)
        }
        if(day == 4){
            endofMenuDate= endofMenuDate- (86400*2*1000)
        }
        if(day == 5){
            endofMenuDate= endofMenuDate- (86400*2*1000)
        }
        if(day == 6){
            endofMenuDate= endofMenuDate- (86400*6*1000)
        }
        if(day == 7){
            endofMenuDate= endofMenuDate- (86400*7*1000)
        }

    }

    const renderItem = (item, id) => {
        if(Object.keys(item).length > 1){
            return(
                <HomeItem key = {item.id} item = {item}/>
            )
                }else{
        console.log("nechapem kde som sa zobral", item)
    }

   
    
}


        return(       
        <Container fluid>
            {
                men===undefined ?
                
                <div>
                    <h1>Loading</h1>
                </div>
                :
               
               <Container>
               <h1 className="Nadpis1"> Vitajte v Storage Masteri <br/> {datum} </h1>
                <Row >            
                    <Col > 
                     
                    
                                          <h1 style={{"color":"#069697"}} className="Nadpis">Expiration Ingredients</h1>
                        
                        <Table striped bordered hover className="tabulka">
                        <thead>
                            <tr>
                                
                                <th className="prvok">Name </th>
                                <th className="prvok">Amount</th>
                                <th className="prvok">Unit</th>
                                <th className="prvok">Expiration Date </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                storage && storage.map((item) => {
                                    //return(renderItem({...storage[item],id:item}, item))
                                    return(renderItem(item, null))
                                })
                            }    
                        </tbody>   
                            </Table>                
                    </Col> 
                     <Col >

                                <Menu index={men[0].id} />    </Col>         </Row>  
                                    </Container>
                                
                           
                                  
            }
        </Container>
    )      
}


const mapStateToProps = (state) => {
    return {
        storage: state.firestore.ordered.storage,
        men: state.firestore.ordered.menu,
        menu1: state.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}

//{collection:"menu",orderBy:["date.seconds","asc"],where:['date.seconds','<=',dat]}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"storage",orderBy:["expirationDate","asc"],where:['expirationDate','<=',currentDate]},{collection:"menu",orderBy:["date.seconds","asc"],where:['date.seconds','<=',dat]}])
)(Home)