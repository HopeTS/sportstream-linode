/*
 *  Root element of React app
 */

 
/* Packages */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'normalize.css/normalize.css';


/* Local files */
import '../sass/main.scss';
import storeConfig from './redux/store/storeConfig';
import Router from './routers/Router';
import save_localStorage from './functions/localStorage/save_localStorage';

/* Configure store */
const store = storeConfig();
store.subscribe(() => {
    // Anything put here happens on every state change
    save_localStorage(store.getState());
});


/* Launch App */
const $appRoot = document.querySelector('#app');
const jsx = (
    <Provider store={store} >
        <Router />
    </Provider>
);

ReactDOM.render(jsx, $appRoot);