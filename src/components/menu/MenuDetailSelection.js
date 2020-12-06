import React, {Component} from 'react'
import {Row, Col} from "react-bootstrap"
import CreatingMenu from './CreatingMenu'
import AllMenuCards from './AllMenuCards';
import { useMediaQuery } from 'react-responsive'
import MenuDetail from "./MenuDetail"

const MenuDetailSelection = (props) => {

    const isSmall = useMediaQuery({ query: '(max-width: 1000px)' })

    if(!isSmall){
        return(
            <MenuDetail index={props.index} isSmall={false}/>
            )
    } else{
        return(
            <MenuDetail index={props.index} isSmall={true}/>
        )
    }

}

export default MenuDetailSelection