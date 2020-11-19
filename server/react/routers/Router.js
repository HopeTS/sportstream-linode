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


/* Actions */
import {login} from '../redux/actions/auth';



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
    };

    fadein_animation() {
        /**
         * Handles the state management for the animation of fading out the
         * page loader and fading in the app content when the app is finished
         * loading.
         */
        
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

    check_session() {
        /**
         * Checks cookies to see if user has logged in with previous session
         * If so, sends the encrypted user id to the server and returns the
         * account information needed for the redux account info.
         */

        // Extract user cookie
        const cookies = document.cookie.split(';')
            .map(cookie => cookie.split('='))
            .filter(cookie => cookie[0] == 'user');

        // If no user cookie, then no authentication.
        if (cookies.length === 0) {
            return;
        }

        // If user cookie, authenticate server-side with passport
        else {
            axios({
                method: 'GET',
                url: `${window.location.origin}/user`
            }).then((res) => {
                console.log(res);
            });
        }

        // If user cookie, send id to the server and retrieve user data
        const user_id = cookies[0][1];
        axios({
            method: 'POST',
            data: {
                user: user_id
            },
            withCredentials: true,
            url: `${window.location.origin}/user`,
        }).then((res) => {
            return console.log(res);
        })

        // TODO: send id string to server
         // TODO: (wire up this endpoint in the auth router)
         // TODO: take account info from response and update redux store.
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

const mapDispatchToProps = (state) => {
    login: (account) => {
        dispatchEvent(login(account));
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Router);