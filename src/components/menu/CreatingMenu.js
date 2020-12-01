import React, { Component } from 'react'
import { Card, Nav, Button } from "react-bootstrap"
import OneDayMenuCard from './OneDayMenuCard';
import Menu from "./Menu.js"

class CreatingMenu extends Component {

    constructor(props) {
        super(props);
        var dayGlobal = 0;
        this.state = { index: 0, save: false };
        this.newMenu = {
            author: "",
            creatingDate: "",
            date: "",
            state: "2",
            monday: [{"recipe":"hhhh", "portions":"4"}],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: []
        }
        localStorage.setItem("newMenu", this.newMenu)
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
        var menu = JSON.parse(localStorage.getItem("allMenu"));
        var menu1 = ["Menu6", "01.01.2020 - 05.01.2020", "userAdmin", "01.01.2020", "01.01.2020", "x"];
        //var recipes1 = JSON.parse(localStorage.getItem("recipes"));
        menu.push(menu1);
        console.log(menu)
        localStorage.setItem("allMenu", JSON.stringify(menu));
        console.log("NEW MENU")
        console.log(this.newMenu)
        this.setMonday("monday", [])
        console.log(this.newMenu)
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
                                this.state.index == 0 ? <OneDayMenuCard index={0} recipes={this.newMenu["monday"]} day={"monday"} setRecipes={this.setRecipesDay} />
                                    : this.state.index == 1 ? <OneDayMenuCard index={1} recipes={this.newMenu["tuesday"]} day={"tuesday"} setRecipes={this.setRecipesDay}/>
                                        : this.state.index == 2 ? <OneDayMenuCard index={2} recipes={this.newMenu["wednesday"]} day={"wednesday"} setRecipes={this.setRecipesDay}/>
                                            : this.state.index == 3 ? <OneDayMenuCard index={3} recipes={this.newMenu["thursday"]} day={"thursday"} setRecipes={this.setRecipesDay}/>
                                                : <OneDayMenuCard index={4} recipes={this.newMenu["friday"]} day={"friday"} setRecipes={this.setRecipesDay}/>
                            }

                        </Card.Body>
                    </Card>
                </section>


        )
    }
}

export default CreatingMenu



