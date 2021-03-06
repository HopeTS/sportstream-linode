export {};
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'normalize.css/normalize.css';

import '../sass/main.scss';
import storeConfig from './redux/store/storeConfig.js';
import Router from './routers/Router.js';


/** React app entry point */
export default class App {
    
    store: any;
    tsx: any;
    $appRoot: any;
    

    constructor() {
        this.$appRoot = document.querySelector('#app');
        this.configure_store();
        this.configure_tsx();
    }


    /** Initialize and configure Redux store */
    private configure_store() {
        this.store = storeConfig();
        this.store.subscribe(() => {
            // Save local storage
        });
    }


    /** Configure TSX */
    private configure_tsx() {
        this.tsx = (
            <Provider store={this.store}>
                <Router />
            </Provider>
        );
    }


    /** Launch React app */
    public start() {
        ReactDOM.render(this.tsx, this.$appRoot);
    }
}


// Startup script
const ReactApp = new App();
ReactApp.start();


module.exports = App;