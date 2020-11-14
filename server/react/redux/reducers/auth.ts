/*
 *  Reducer for handling authentication in Redux
 */


/* Reducer */
const AuthDefaultState = {
    account: null
};

export default (state = AuthDefaultState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...action.account
            };
        
        case 'LOGOUT':
            return null;

        default:
            return state;
    }
};