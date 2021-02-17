export const initialState = {
	errorMessages: {
		email: null,
        username: null,
        password: null,
		generic: null,
	},
	usernameInput: null,
	emailInput: null,
	passwordInput: null,
	loggedInUser: null,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_EMAIL_ERROR':
			return {
				...state,
				errorMessages: {
					email: `Email ${action.message}`,
                    username: state.errorMessages.username,
                    password: state.errorMessages.password,
					generic: state.errorMessages.generic,
				},
			};
		case 'CHANGE_USERNAME_ERROR':
			return {
				...state,
				errorMessages: {
					email: state.errorMessages.email,
					username: `Username ${action.message}`,
					password: state.errorMessages.password,
					generic: state.errorMessages.generic,
				},
			};
		case 'CHANGE_PASSWORD_ERROR':
			return {
				...state,
				errorMessages: {
					email: state.errorMessages.email,
					username: state.errorMessages.username,
					password: `Password ${action.message}`,
					generic: state.errorMessages.generic,
				},
			};
		case 'CHANGE_GENERIC_ERROR':
			return {
				...state,
				errorMessages: {
					email: state.errorMessages.email,
					username: state.errorMessages.username,
					password: state.errorMessages.password,
					generic: action.message,
				},
			};
		case 'CHANGE_USERNAME_INPUT':
			return {
				...state,
				usernameInput: action.value,
			};
		case 'CHANGE_EMAIL_INPUT':
			return {
				...state,
				emailInput: action.value,
			};
		case 'CHANGE_PASSWORD_INPUT':
			return {
				...state,
				passwordInput: action.value,
			};
		case 'SET_LOGGED_IN_USER':
			return {
				...state,
				loggedInUser: action.user,
			};
		default:
			return state;
	}
};
