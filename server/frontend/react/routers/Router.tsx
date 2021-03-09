import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import Dashboard from '../components/pages/Dashboard/Dashboard';
import Wildcard from '../components/pages/Wildcard';
import Watch from '../components/pages/Watch';
import AccountPage from '../components/pages/AccountPage/AccountPage';

import {login} from '../redux/actions/auth';
import ClientStorage from '../functions/clientStorage/ClientStorage';
import {accountMenu__Off} from '../redux/actions/ui';


// Store config
const mapStateToProps = (state: any) => {
    return {
        page_ID: state.page.id,
        accountMenu: state.ui.accountMenu
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    login: (account: any) => {
        dispatch(login(account));
    },
    accountMenu__Off: () => {
        dispatch(accountMenu__Off());
    }
});


/** React Router root component */
const Router = connect(
    mapStateToProps, mapDispatchToProps
)(function(props: any) {


    const clientStorage = new ClientStorage;

    const [loading, set_loading] = useState<boolean>(false);
    const [loaded, set_loaded] = useState<boolean>(false);


    useEffect(() => {
        fade_in_animation();
        load_local_storage();
    }, []);


    /** Handles initial content fade in */
    function fade_in_animation() {

         // Disable loader
         const $pageLoader = document.querySelector('.page_loader');
         if ($pageLoader) $pageLoader.setAttribute('data-loading', 'true');
        set_loading(true);

        console.log('updating!')

         // Fade in React app
        setTimeout(() => {
            if ($pageLoader) $pageLoader.setAttribute('data-loaded', 'true');
            set_loaded(true);
        }, 300);
    }
    

    /** Handles loading session authentication from clientStorage */
    function load_local_storage() {
        const userData = clientStorage.load();
        console.log(userData);
    }


    /** Disables account card */
    function disable_account_card() {
        if (props.accountMenu) props.accountMenu__Off();
    }


    return (
        <BrowserRouter>
            <div 
                id="Router"
                data-page_id={props.page_ID}
                data-loading={loading}
                data-loaded={loaded}
                onClick={disable_account_card}
            >
                <Header />                    

                <Switch>
                    <Route 
                        path="/"
                        component={Home}
                        exact
                    />

                    <Route 
                        path="/login"
                        component={Login}
                        exact
                    />

                    <Route 
                        path="/register"
                        component={Register}
                        exact
                    />

                    <Route 
                        path="/dashboard"
                        component={Dashboard}
                        exact
                    />

                    <Route 
                        path="/watch"
                        component={Watch}
                    />

                    <Route 
                        path="/account"
                        component={AccountPage}
                        exact
                    />

                    <Route 
                        path="/*"
                        component={Wildcard}
                    />
                </Switch>

                <Footer />
            </div>
        </BrowserRouter>
    );
});


export = Router;