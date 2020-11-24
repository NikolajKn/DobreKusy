import {combineReducers} from "redux";
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import recipesReducer from "./recipesReducer"

const rootReducer = combineReducers({
    recipes: recipesReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer

})

export default rootReducer;