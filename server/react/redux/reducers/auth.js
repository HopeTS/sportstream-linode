/*
 *  Reducer for handling authentication in Redux
 */


/* Reducer */
const AuthDefaultState = {
    isAuthenticated: false,
    account: {
        type: undefined,
        name: '',
        email: ''
    }
};

export default (state = AuthDefaultState, action) => {
    switch(action.type) {

        case 'LOGIN':

            return {
                ...state,
                isAuthenticated: true,
                account: {
                    type: action.account.type,
                    name: action.account.name,
                    email: action.account.email
                }
            };

        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                account: {
                    type: undefined,
                    name: '',
                    email: ''
                }
            };

        default:
            return state;
    }
};