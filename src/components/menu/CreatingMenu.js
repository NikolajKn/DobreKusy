import React, { Component } from 'react'
import { Card, Nav, Button } from "react-bootstrap"
import OneDayMenuCard from './OneDayMenuCard';
import Menu from "./Menu.js"
import { connect } from "react-redux"
import firebase from "firebase"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
import {addItem, editItem} from "../../store/actions/menuActions"



class CreatingMenu extends Component {

    constructor(props) {
        super(props);
        var dayGlobal = 0;
        this.state = { index: 0, save: false };
    }

    setCreatingDate(){
        var date = Date.now()
        this.newMenu["creatingDate"] = date
    }

    setAuthor(){
        var author = firebase.auth().currentUser
        this.newMenu["author"] = author
    }

    setDate(){
        var date = Date.now()
        this.newMenu["date"] = date
    }

    setRecipesDay = (day, array) => {
        this.newMenu[day] = array
    }

    handleClick5 = (e) => {
        e.preventDefault();
        var day = e.nativeEvent.target.hash;
        day = day.replace("#", "");
        this.setState({ index: day * 1 })
    };

    saveMenu() {
        var newMenu = this.props.menu1.newMenu
        if(!this.props.update){
            var creatingDate = Date.now()
            newMenu.creatingDate = creatingDate
            newMenu.date = Date.now()
        }
        if(this.props.update){
            this.props.editItem(newMenu, this.props.menu1.actualMenu)
            this.setState({save:true})
        } else {
            this.props.addItem(newMenu)
        }
        this.props.setMinimal(false)
        this.props.setNewMenu({
            author: "tester",
            creatingDate: "",
            date: "",
            state: "2",
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: []
        })
    }

    render() {
        return (
            this.state.save ? <Menu />
                :
                <>
                    {
                        this.props.update ? <h1 style={{ margin: "5%" }}>Update menu</h1>
                        : <h1 style={{ margin: "5%" }}>Create new menu</h1>
                    } 
                    <Card className="creatingCard" as={"article"}  style={this.props.isSmall ?{margin:"2%"}:null} >
                        <Card.Header as={"header"}>
                            <Button variant="success" style={this.props.isSmall ? { width: "50%" }:{width: "25%"}} className="buttonAddMenu" onClick={() => { this.saveMenu() }}> Save </Button>

                            <Nav variant="tabs" defaultActiveKey="#0" className="creatingMenuTab" as={"nav"}>
                                <Nav.Item>
                                    <Nav.Link as={"a"} onClick={this.handleClick5.bind(this)} href="#0" className="creatingMenuTabLink" >Monday</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={"a"} onClick={this.handleClick5.bind(this)} href="#1" className="creatingMenuTabLink">Tuesday</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={"a"} onClick={this.handleClick5.bind(this)} href="#2" className="creatingMenuTabLink">Wednesday</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={"a"} onClick={this.handleClick5.bind(this)} href="#3" className="creatingMenuTabLink">Thursday</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link  as={"a"} onClick={this.handleClick5.bind(this)} href="#4" className="creatingMenuTabLink">Friday</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body as={"form"}>
                            <Card.Title className="creatingCardText" as={"header"}>Selected recipes:</Card.Title>

                            {
                                this.state.index == 0 ? <OneDayMenuCard index={0} day={"monday"} setRecipes={this.setRecipesDay} isSmall={this.props.isSmall} />
                                    : this.state.index == 1 ? <OneDayMenuCard index={1} day={"tuesday"} setRecipes={this.setRecipesDay} isSmall={this.props.isSmall}/>
                                        : this.state.index == 2 ? <OneDayMenuCard index={2} day={"wednesday"} setRecipes={this.setRecipesDay} isSmall={this.props.isSmall}/>
                                            : this.state.index == 3 ? <OneDayMenuCard index={3} day={"thursday"} setRecipes={this.setRecipesDay} isSmall={this.props.isSmall}/>
                                                : <OneDayMenuCard index={4} day={"friday"} setRecipes={this.setRecipesDay} isSmall={this.props.isSmall}/>
                            }

                        </Card.Body>
                    </Card>
                </>


        )
    }
}  

const setMinimal = (minimal) => {
    return {
        type: "SET_MINIMAL", 
        payload: minimal
    }
}

const setNewMenu = (menu) => {
    return {
        type: "PUSH_RECIPES", 
        payload: menu
    }
}

const mapStateToProps = (state, props) => {
    return {
        menu1: state.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (menu) => dispatch(addItem(menu)), 
        setMinimal: (minimal) => dispatch(setMinimal(minimal)),
        editItem: (menu, index) => dispatch(editItem(menu, index)),
        setNewMenu: (menu) => dispatch(setNewMenu(menu)) 
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"menu", orderBy:["state","desc"]}])
)(CreatingMenu)



