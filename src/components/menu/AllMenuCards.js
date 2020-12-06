import React, {Component} from 'react'
import {Spinner} from "react-bootstrap"
import MenuCard from "./MenuCard"
import { connect } from "react-redux"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";

class AllMenuCards extends Component{

    constructor(props){
        super(props);
    }

    render(){
        if(!this.props.menu){
            return <article style={{textAlign:"center"}}><Spinner animation="border" /></article>
        } else{
            console.log(this.props.menu)
            return(
                <>
                    {this.props.menu && Object.keys(this.props.menu).map((menu1, index) => 
                        <article key={index}>
                        {
                        <MenuCard 
                            index={menu1}
                            menu={this.props.menu[menu1]}
                            sidebar = {this.props.sidebar}
                        />
                        }
                        </article>
                    )}
                </>
            )
        }
        }
}

const mapStateToProps = (state, props) => {
    return {
        menu: state.firestore.data.menu,
        menu1: state.menu
    }
}

export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([{collection:"menu", orderBy:["state","desc"]}])
)(AllMenuCards)

