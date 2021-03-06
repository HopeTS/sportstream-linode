import {createStore, combineReducers} from 'redux'

import UI_Reducer from '../reducers/ui';
import Page_Reducer from '../reducers/page';
import Auth_Reducer from '../reducers/auth';


/* Store */
export default () => {
    return createStore(
        combineReducers({
            ui: UI_Reducer,
            page: Page_Reducer,
            auth: Auth_Reducer
        })
    );
};