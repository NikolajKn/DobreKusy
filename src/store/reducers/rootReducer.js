import {combineReducers} from "redux";
import recipesReducer from "./recipesReducer"
import menuReducer from "./menuReducer"
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    recipes: recipesReducer,
    menu: menuReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default rootReducer;