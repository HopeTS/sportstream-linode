interface uiState {
    navMenu_Mobile: boolean;
    accountMenu: boolean;
}


/** UI reducer default state */
const UIDefaultState: uiState = {
    navMenu_Mobile: false,
    accountMenu: false
};


/** UI Reducer */
function UIReducer(
    state: uiState = UIDefaultState, action: any
): uiState {
    switch(action.type) {
        case 'MOBILE_NAV__TOGGLE':
            return {
                ...state,
                navMenu_Mobile: state.navMenu_Mobile ? false : true
            };

        case 'MOBILE_NAV__ON':
            return {
                ...state,
                navMenu_Mobile: true
            };
    

        case 'MOBILE_NAV__OFF':
            return {
                ...state,
                navMenu_Mobile: false
            };

        case 'ACCOUNT_MENU__TOGGLE':
            return {
                ...state,
                accountMenu: state.accountMenu ? false : true
            }

        case 'ACCOUNT_MENU__ON':
            return {
                ...state,
                accountMenu: true
            };
    

        case 'ACCOUNT_MENU__OFF':
            return {
                ...state,
                accountMenu: false
            };

        default:
            return state;
    };
}


export = UIReducer;