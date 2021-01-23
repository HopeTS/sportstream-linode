import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import Wildcard from '../components/pages/Wildcard';
import Watch from '../components/pages/Watch';
import AccountPage from '../components/pages/AccountPage/AccountPage';

import {login} from '../redux/actions/auth';
import {loadState} from '../functions/auth/localStorage';
import {accountMenu__Off} from '../redux/actions/ui';


/** Master Router component */
export class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loading: false
        };
    };

    componentWillMount() {
        this.fadein_animation();
        this.load_localStorage();
    };

    /**
     * Handles the state management for the animation of fading out the
     * page loader and fading in the app content when the app is finished
     * loading.
     */
    fadein_animation() {
        
        // Disable loader
        const $pageLoader = document.querySelector('.page_loader');
        if ($pageLoader) {
            $pageLoader.setAttribute('data-loading', true);
            this.setState({
                loading: true
            });
        };

        // Fade in React app
        setTimeout(() => {
            $pageLoader.setAttribute('data-loaded', true);
            this.setState({
                loaded: true
            });
        }, 300);
    }

    /**
     * Loads data from localStorage to log user in, if user is stored in
     * localStorage
     */
    load_localStorage = () => {
        
        // Check if user is authenticated
        const userData = loadState();
        if (userData) {
            if (userData.auth.isAuthenticated) {
            
                // Login with auth data
                try {
                    this.props.login(userData.auth.account)
                
                } catch(e) {
                    console.error(e);
                }
    
            }
        } 
        
        else {
            return;
        }
    }

    /** Handler for toggling accountMenu (the account card) */
    accountMenu__Off = () => {
        if (this.props.accountMenu) {
            this.props.accountMenu__Off();
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div 
                    id="Router"
                    data-page_id={this.props.page_ID}
                    data-loading={this.state.loading}
                    data-loaded={this.state.loaded}
                    onClick={this.accountMenu__Off}
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
                            path="/watch"
                            component={Watch}
                            exact
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
    };
};


/* Connect to store */
const mapStateToProps = (state) => {
    return {
        page_ID: state.page.id,
        accountMenu: state.ui.accountMenu
    };
};

const mapDispatchToProps = (dispatch) => ({
    login: (account) => {
        dispatch(login(account));
    },
    accountMenu__Off: () => {
        dispatch(accountMenu__Off());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Router);