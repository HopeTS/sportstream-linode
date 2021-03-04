/*
 *  Reducer for handling UI information in Redux
 */


/* Reducer */
const UIDefaultState = {
    navMenu_Mobile: false,
    accountMenu: false
};

export default (state = UIDefaultState, action) => {
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
};