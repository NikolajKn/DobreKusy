import React, {Component} from 'react'
import {Row} from "react-bootstrap"
import CreatingMenu from './CreatingMenu'
import SidebarMenu from './SidebarMenu'

class AllMenuMinimal extends Component{

    constructor(props){
        super(props);
    }

    render(){
        var allMenu = JSON.parse(localStorage.getItem("allMenu"));
        var recipes = JSON.parse(localStorage.getItem("recipes"));
        return(
            <Row>
                <div className="col-2 vl">
                    <SidebarMenu numCol={12} allMenu={allMenu}/>
                </div>
                <div className="col-9">
                    <CreatingMenu recipes={recipes}/>
                </div>
            </Row>

        )
    }
}

export default AllMenuMinimal