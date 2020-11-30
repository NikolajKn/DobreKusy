const initState = {
    loading: false, 
    error: "",
    allMenu: {},
    actualMenu: null 
}

const menuReducer=(state=initState, action) => {

    switch(action.type){
        case "SEND_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "FAIL":
            return {
                ...state,
                loading: false,
                allMenu: [], 
                error: action.payload,
                actualMenu: null
            }
            
        case "FETCH_ALL_MENU":

        return {
                ...state,
                loading: false,
                allMenu: action.payload, 
                error: "",
                actualMenu: null
            }

        case "FETCH_MENU":
            return {
                ...state,
                loading: false, 
                error: "",
                actualMenu: action.payload
            }

        case "CREATE_MENU":
            return {
                ...state,
                loading: false, 
                error: "", 
                actualMenu: null
            }

        case "DELETE_MENU":
            return {
                ...state,
                loading: false, 
                error: "", 
                actualMenu: null
            }
        
        default:
            return state
    }
}

export default menuReducer;