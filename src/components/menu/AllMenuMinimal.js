import React, {Component} from 'react'
import {Row, Col} from "react-bootstrap"
import CreatingMenu from './CreatingMenu'
import AllMenuCards from './AllMenuCards';
import { useMediaQuery } from 'react-responsive'

const AllMenuMinimal = (props) => {

    const isMobile = useMediaQuery({ query: '(max-width: 760px)' })

        var allMenu = JSON.parse(localStorage.getItem("allMenu"));
        var recipes = JSON.parse(localStorage.getItem("recipes"));
        console.log("IS MOBILE")
        console.log(isMobile)
        if(!isMobile){
            return(
                <Row>
                    <Col sm={2} as={"aside"}>
                        <AllMenuCards numCol={12} allMenu={allMenu} sidebar={true} />
                    </Col>
                    <Col sm={9} as={"section"}>
                        <CreatingMenu recipes={recipes}/>
                    </Col>
                </Row>
    
            )
        } else{
            return(
                <CreatingMenu recipes={recipes}/>
            )
        }

}

export default AllMenuMinimal