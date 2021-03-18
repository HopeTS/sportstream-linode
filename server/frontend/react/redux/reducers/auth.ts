interface authState {
    isAuthenticated: boolean;
    account: {
        type: string;
        name: string;
        email: string;
    }
}


/** Auth reducer default state */
const AuthDefaultState: authState = {
    isAuthenticated: false,
    account: {
        type: '',
        name: '',
        email: ''
    }
};


/** Auth reducer */
function AuthReducer(
    state: authState = AuthDefaultState, action: any
): authState {
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


export = AuthReducer;