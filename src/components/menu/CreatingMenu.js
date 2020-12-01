import React, { Component } from 'react'
import { Card, Nav, Button } from "react-bootstrap"
import OneDayMenuCard from './OneDayMenuCard';
import Menu from "./Menu.js"
import { connect } from "react-redux"
import {fetchAllMenu} from "../../store/actions/menuActions"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
import {addItem} from "../../store/actions/menuActions"


class CreatingMenu extends Component {

    constructor(props) {
        super(props);
        var dayGlobal = 0;
        this.state = { index: 0, save: false };
        console.log(this.props.menu1)
    }

    setCreatingDate(){
        var date = Date.now()
        this.newMenu["creatingDate"] = date
    }

    setAuthor(){
        var author = "tester"
        this.newMenu["author"] = author
    }

    setDate(){
        var date = Date.now()
        this.newMenu["date"] = date
    }

    setRecipesDay = (day, array) => {
        this.newMenu[day] = array
    }

    handleClick = (e) => {
        e.preventDefault();
        var day = e.nativeEvent.target.hash;
        day = day.replace("#", "");
        this.setState({ index: day * 1 })
    };

    saveMenu() {

        var newMenu = this.props.menu1.newMenu
        var creatingDate = Date.now()
        newMenu.creatingDate = creatingDate
        newMenu.date = Date.now()
        console.log(newMenu)
        console.log("NEW MENU")
        console.log(this.props.menu1.newMenu)
        this.props.addItem(newMenu)
        this.props.setMinimal(false)
        //window.location.reload(false)
    }

    render() {
        return (
            this.state.save ? <Menu />
                :
                <section>
                    <h1 style={{ margin: "5%" }}>Create new menu</h1>
                    <Card className="creatingCard">
                        <Card.Header>
                            <Button variant="success" style={{ width: "25%" }} className="buttonAddMenu" onClick={() => { this.saveMenu() }}> Save </Button>

                            <Nav variant="tabs" defaultActiveKey="#0" className="creatingMenuTab">
                                <Nav.Item>
                                    <Nav.Link onClick={this.handleClick.bind(this)} href="#0" className="creatingMenuTabLink" >Monday</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={this.handleClick.bind(this)} href="#1" className="creatingMenuTabLink">Tuesday</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={this.handleClick.bind(this)} href="#2" className="creatingMenuTabLink">Wednesday</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={this.handleClick.bind(this)} href="#3" className="creatingMenuTabLink">Thursday</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={this.handleClick.bind(this)} href="#4" className="creatingMenuTabLink">Friday</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title className="creatingCardText">Selected recipes:</Card.Title>

                            {
                                this.state.index == 0 ? <OneDayMenuCard index={0} day={"monday"} setRecipes={this.setRecipesDay} />
                                    : this.state.index == 1 ? <OneDayMenuCard index={1} day={"tuesday"} setRecipes={this.setRecipesDay}/>
                                        : this.state.index == 2 ? <OneDayMenuCard index={2} day={"wednesday"} setRecipes={this.setRecipesDay}/>
                                            : this.state.index == 3 ? <OneDayMenuCard index={3} day={"thursday"} setRecipes={this.setRecipesDay}/>
                                                : <OneDayMenuCard index={4} day={"friday"} setRecipes={this.setRecipesDay}/>
                            }

                        </Card.Body>
                    </Card>
                </section>


        )
    }
}  

const setMinimal = (minimal) => {
    return {
        type: "SET_MINIMAL", 
        payload: minimal
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
        setMinimal: (minimal) => dispatch(setMinimal(minimal)) 
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"menu", orderBy:["state","desc"]}])
)(CreatingMenu)



