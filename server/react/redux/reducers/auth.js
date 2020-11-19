/*
 *  Reducer for handling authentication in Redux
 */


/* Reducer */
const AuthDefaultState = {
    isAuthenticated: false,
    account: {
        email: '',
        type: '',
        genkey: ''
    }
};

export default (state = AuthDefaultState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                isAuthenticated: true,
                account: {
                    email: action.account.email,
                    type: action.account.type,
                    genkey: action.account.genkey
                }
            };
        
        case 'LOGOUT':
            return {
                isAuthenticated: false,
                account: {
                    email: '',
                    type: '',
                    genkey: ''
                }
            };

        default:
            return state;
    }
};