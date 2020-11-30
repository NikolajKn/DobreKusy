import firebase from "../../config/config"

export const sendRequest = () => {
    return {
        type: "SEND_REQUEST"
    }
}

export const fail = error => {
    return {
        type: "FAIL", 
        payload: error
    }
}

export const fetchAllMenuSuccess = menu => {
    return {
        type: "FETCH_ALL_MENU", 
        payload: menu
    }
}

export const fetchMenuSuccess = menu => {
    return {
        type: "FETCH_MENU", 
        payload: menu
    }
}

export const fetchAllMenu = () => {
    return (dispatch) => {
        dispatch(sendRequest())
        const db = firebase.firestore()
        db.collection("menu").get()
        .then(response => {
            var result = {}
            response.docs.map(doc => {
                result[doc.id] = doc.data()
            })
            dispatch(fetchAllMenuSuccess(result))
        })
        .catch(error => {
            dispatch(fail(error.message))
        })
        
    }
}
/*
export const fetchMenu = (id) => {
    return (dispatch) => {
        dispatch(sendRequest())
        const db = firebase.firestore()
        db.collection("menu").doc(id).get()
        .then(response => {
            console.log(response.data())
            /*var result = {}
            response.docs.map(doc => {
                result[doc.id] = doc.data()
            })*/
            //console.log("TU")
            //console.log(result)
            //dispatch(fetchMenuSuccess(result))
/*        })
        .catch(error => {
            dispatch(fail(error.message))
        })
        
    }
}*/

export const editItem = (menu, index) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("menu").doc(index).update({
            state: menu.state,
            author: menu.author, 
            creatingDate: menu.creatingDate, 
            date: menu.date, 
            friday: menu.friday, 
            thursday: menu.thursday, 
            wednesday: menu.wednesday, 
            tuesday: menu.tuesday, 
            monday: menu.monday
        }).then(
            (docRef)=> {} 
        )
        
    }
}