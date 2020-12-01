const initState = {
    loading: false, 
    error: "",
    allMenu: {},
    actualMenu: "", 
    newMenu : {
        author: "",
        creatingDate: "",
        date: "",
        state: "2",
        monday: [{"recipe":"hhhh", "portions":"4"}],
        tuesday: [{"recipe":"iii", "portions":"4"}],
        wednesday: [{"recipe":"jjjj", "portions":"4"}],
        thursday: [{"recipe":"kkk", "portions":"4"}],
        friday: [{"recipe":"llll", "portions":"4"}]
    }
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

        case "SET_ACTUAL_MENU":
            return {
                ...state,
                loading: false, 
                error: "", 
                actualMenu: action.payload
            }

        
        case "SET_FIRST":
            return {
                ...state,
                loading: false, 
                error: "", 
                actualMenu: action.payload
            }
        
        case "PUSH_RECIPES":
            return {
                ...state, 
                newMenu: action.payload
            }

        
        default:
            return state
    }
}

export default menuReducer;