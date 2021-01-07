/*
 *  Reducer for handling authentication in Redux
 */


/* Reducer */
const AuthDefaultState = {
    isAuthenticated: false,
    account: {
        name: '',
        email: '',
        type: '',
        connected_businesses: [],
        connection_id: '',
        stream_key: []
    }
};

export default (state = AuthDefaultState, action) => {
    switch(action.type) {

        case 'LOGIN':
            const connected_businesses = action.account.connected_businesses ?
                action.account.connected_businesses : [];
            const connection_id = action.account.connection_id ?
                action.account.connection_id : '';
            const stream_key = action.account.stream_key ? 
                action.account.stream_key : [];

            return {
                ...state,
                isAuthenticated: true,
                account: {
                    name: action.account.name,
                    email: action.account.email,
                    type: action.account.type,
                    connected_businesses: connected_businesses,
                    connection_id: connection_id,
                    stream_key: stream_key
                }
            };

        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                account: {
                    name: '',
                    email: '',
                    type: '',
                    connected_businesses: [],
                    connection_id: '',
                    stream_key: []
                }
            };

        default:
            return state;
    }
};