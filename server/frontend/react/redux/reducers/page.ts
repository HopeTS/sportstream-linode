interface pageState {
    id: string | null;
}


/** Page reducer default state */
const PageDefaultState: pageState = {
    id: null
};


/** Page reducer */
function PageReducer(
    state: pageState = PageDefaultState, action: any
): pageState {
    switch(action.type) {
        case 'PAGE_ID__SET':
            return {
                ...state,
                id: action.id
            };

        default:
            return state; 
    };
}


export = PageReducer;