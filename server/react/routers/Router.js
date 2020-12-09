/*
 *  Router component
 */


/* External packages */
import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';


/* Components */
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';


/* Pages/Routes */
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import Wildcard from '../components/pages/Wildcard';
import Streams from '../components/pages/Streams';


/* Actions */
import { login } from '../redux/actions/auth';
import { loadState } from '../auth/localStorage';



/* Router */
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
        //this.check_session(); //<- logging in from cookie too  risky
        //console.log(loadState());
        this.load_localStorage();
    };

    /**
     * Handles the state management for the animation of fading out the
     * page loader and fading in the app content when the app is finished
     * loading.
     */
    fadein_animation() {
        
        // Disable loader
        const $pageLoader = document.querySelector('.page-loader');
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

        if (userData.auth.isAuthenticated) {
            
            // Login with auth data
            try {
                this.props.login(userData.auth.account)
            
            } catch(e) {
                console.error(e);
            }

        } else {
            return;
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
                            path="/streams"
                            component={Streams}
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
        page_ID: state.page.id
    };
};

const mapDispatchToProps = (dispatch) => ({
    login: (account) => {
        dispatch(login(account));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Router);