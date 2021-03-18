import {createStore, combineReducers, Store} from 'redux'

import UIReducer from '../reducers/ui';
import PageReducer from '../reducers/page';
import AuthReducer from '../reducers/auth';


/** Redux store */
function Store(): any {
    return createStore(
        combineReducers({
            ui: UIReducer,
            page: PageReducer,
            auth: AuthReducer
        })
    );
};


export = Store;