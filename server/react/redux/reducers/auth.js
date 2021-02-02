/*
 *  Reducer for handling authentication in Redux
 */

const AuthDefaultState = {
    isAuthenticated: false,
    account: {
        type: '',
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
                    type: '',
                    name: '',
                    email: ''
                }
            };

        default:
            return state;
    }
};