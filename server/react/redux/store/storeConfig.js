/*
 *  Master configuration file for Redux store
 */


/* Packages */
import {createStore, combineReducers} from 'redux'


/* Reducers */
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