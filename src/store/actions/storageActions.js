export const loadStorage = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({
            type: "loadStorage",
            //storage   
        }
        )
    }
}


export const addItem = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
    
        firestore.collection("storage").add({
            amount: "",
            expirationDate: "",
            measurementUnit : "",
            name: ""
        }).then(
            (docRef)=> {console.log(docRef)} 
        )
        
        
    }
}

export const editItem = (item) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection("storage").doc(item.id).update({
            amount: item.amount,
            expirationDate: item.expirationDate,
            measurementUnit : item.measurementUnit,
            name: item.name
        }).then(
            (docRef)=> {} 
        )
        
    }
}