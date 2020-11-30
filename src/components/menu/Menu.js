import React, {Component} from 'react'
import {Button, Container} from "react-bootstrap"
import AllMenuCards from "./AllMenuCards"
import AllMenuMinimal from "./AllMenuMinimal"

class Menu extends Component{

    constructor(props){
        super(props);
        this.state = {minimal : false};
        var allMenu = [["Menu", "01.01.2020 - 05.01.2020", "userAdmin", "01.01.2020", "01.01.2020", null],
                        ["Menu", "01.01.2020 - 05.01.2020", "userAdmin", "01.01.2020", "01.01.2020", true], 
                        ["Menu", "01.01.2020 - 05.01.2020", "userAdmin", "01.01.2020", "01.01.2020", true], 
                        ["Menu", "01.01.2020 - 05.01.2020", "userAdmin", "01.01.2020", "01.01.2020", false],
                        ["Menu", "01.01.2020 - 05.01.2020", "userAdmin", "01.01.2020", "01.01.2020", true]];

        var recipes = [["Recipe1", "Recipe2"], ["Recipe3", "Recipe4", "Recipe5"], ["Recipe7", "Recipe10"], ["Recipe15", "Recipe2"], ["Recipe1"]];
        localStorage.setItem("allMenu", JSON.stringify(allMenu))
        localStorage.setItem("recipes", JSON.stringify(recipes))
    }

    render(){
        return(
                this.state.minimal ? 
                <AllMenuMinimal/>
                : 
                <Container>
                    <h1>All menu</h1>
                    <Button variant="success" className="buttonAddMenu" onClick={() => this.setState({minimal:true})}> + New menu</Button>
                    <AllMenuCards numCol="6"/>
                </Container>

        )
    }
}

export default Menu