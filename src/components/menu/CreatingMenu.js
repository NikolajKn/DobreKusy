import React, { Component } from 'react'
import { Card, Nav, Button, Alert } from "react-bootstrap"
import OneDayMenuCard from './OneDayMenuCard';
import Menu from "./Menu.js"
import { connect } from "react-redux"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
import {addItem, editItem} from "../../store/actions/menuActions"


class CreatingMenu extends Component {

    constructor(props) {
        super(props);
        if(localStorage.getItem("menu") != null && localStorage.getItem("menu") != "" && !this.props.update){
            this.state = { index: 0, showAlert: true};
        } else {
            this.state = { index: 0, showAlert: false};
        }
    }

    recoverData(){
        var m = JSON.parse(localStorage.getItem("menu"))
        this.props.setNewMenu(m) 
        this.setState({showAlert:false})
    }

    deleteData(){
        this.setState({showAlert:false})
        localStorage.setItem("menu", "")
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
        if(!this.props.update){
            localStorage.setItem("menu", "")
        }
    }

    render() {
        console.log("TU PISEM ")
        console.log(this.props.menu1.expiringIngredients)
        console.log(this.props.menu1.otherIngredients)
        return (
            this.state.save ? <Menu />
                :
                <>
                    {
                        this.props.update ? <h1 style={{ margin: "5%" }}>Update menu</h1>
                        : <h1 style={{ margin: "5%" }}>Create new menu</h1>
                    } 
                    {
                        this.state.showAlert ? 
                        <Alert variant="dark">
                            <Alert.Heading>Unsaved menu</Alert.Heading>
                            <p>
                            Previous menu wasn't saved. Do you want to recover data?  
                            </p>
                            <div style={{textAlign:"center"}}>
                            <Button variant="success" style={this.props.isSmall ? { width:"48%"}:{width:"20%", marginRight:"1%"}} onClick={(e) => {this.recoverData()}}>Yes</Button>
                            <Button variant="danger" style={this.props.isSmall ? { width:"48%"}:{width:"20%", marginLeft:"1%"}} onClick={(e) => {this.deleteData()}}>No</Button>
                            </div>
                        </Alert>

                        :
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
                                this.state.index == 0 ? <OneDayMenuCard index={0} day={"monday"} setRecipes={this.setRecipesDay} isSmall={this.props.isSmall} update={this.props.update} />
                                    : this.state.index == 1 ? <OneDayMenuCard index={1} day={"tuesday"} setRecipes={this.setRecipesDay} isSmall={this.props.isSmall} update={this.props.update} />
                                        : this.state.index == 2 ? <OneDayMenuCard index={2} day={"wednesday"} setRecipes={this.setRecipesDay} isSmall={this.props.isSmall} update={this.props.update} />
                                            : this.state.index == 3 ? <OneDayMenuCard index={3} day={"thursday"} setRecipes={this.setRecipesDay} isSmall={this.props.isSmall} update={this.props.update} />
                                                : <OneDayMenuCard index={4} day={"friday"} setRecipes={this.setRecipesDay} isSmall={this.props.isSmall} update={this.props.update} />
                            }

                        </Card.Body>
                    </Card>
                    }
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
        menu1: state.menu,
        recipes1: state.firestore.data.recipes
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
    firestoreConnect([{collection:"menu", orderBy:["state","desc"]},{collection:"recipes"}])
)(CreatingMenu)



