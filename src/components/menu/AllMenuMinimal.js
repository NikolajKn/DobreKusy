import React, {Component} from 'react'
import {Row, Col} from "react-bootstrap"
import CreatingMenu from './CreatingMenu'
import AllMenuCards from './AllMenuCards';
import { useMediaQuery } from 'react-responsive'

const AllMenuMinimal = (props) => {

    const isSmall = useMediaQuery({ query: '(max-width: 1000px)' })

        var allMenu = JSON.parse(localStorage.getItem("allMenu"));
        var recipes = JSON.parse(localStorage.getItem("recipes"));
        if(!isSmall){
            return(
                <Row style={{marginLeft:"0%", marginRight:"0%"}}>
                    <Col sm={2} as={"aside"}>
                        <AllMenuCards numCol={12} allMenu={allMenu} sidebar={true} isSmall={isSmall} />
                    </Col>
                    <Col sm={9} as={"section"}>
                        <CreatingMenu recipes={recipes} isSmall={isSmall}/>
                    </Col>
                </Row>
            )
        } else{
            return(
                <CreatingMenu recipes={recipes} isSmall={isSmall}/>
            )
        }

}

export default AllMenuMinimal