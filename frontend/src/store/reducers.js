export const initialState = {
    errorMessage: null,
    usernameInput: null,
    emailInput: null,
    passwordInput: null,
    loggedInUser: null,
}

export const reducer = (state, action) => {
    switch(action.type){
        case 'CHANGE_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: action.message
            }
        case 'CHANGE_USERNAME_INPUT':
            return {
                ...state,
                usernameInput: action.value
            }
        case 'CHANGE_EMAIL_INPUT':
            return {
                ...state,
                emailInput: action.value
            }
        case 'CHANGE_PASSWORD_INPUT':
            return {
                ...state,
                passwordInput: action.value
            }
        case 'SET_LOGGED_IN_USER':
            return {
                ...state,
                usernameInput: action.user
            }
        default:
            return state;
    }
    
}