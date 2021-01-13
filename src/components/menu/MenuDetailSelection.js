import React from 'react'
import { useMediaQuery } from 'react-responsive'
import MenuDetail from "./MenuDetail"

const MenuDetailSelection = (props) => {

    const isSmall = useMediaQuery({ query: '(max-width: 1000px)' })

    if(!isSmall){
        return(
            <MenuDetail index={props.index} isSmall={false} getExpiringIngredients={props.getExpiringIngredients}/>
            )
    } else{
        return(
            <MenuDetail index={props.index} isSmall={true} getExpiringIngredients={props.getExpiringIngredients}/>
        )
    }

}

export default MenuDetailSelection