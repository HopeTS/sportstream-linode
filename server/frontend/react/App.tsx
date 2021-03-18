import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'normalize.css/normalize.css';

import '../sass/main.scss';
import Store from './redux/store/storeConfig.js';
import Router from './routers/Router.js';
import ClientStorage from './functions/clientStorage/ClientStorage';


/** React app entry point */
class App {
    
    store: any;
    tsx: any;
    $appRoot: any;
    clientStorage: ClientStorage;
    

    constructor() {
        this.$appRoot = document.querySelector('#app');
        this.clientStorage = new ClientStorage;
        this.configure_store();
        this.configure_tsx();
    }


    /** Initialize and configure Redux store */
    private configure_store() {
        this.store = Store();
        this.store.subscribe(() => {
            this.clientStorage.save(this.store.getState());
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


export = App;