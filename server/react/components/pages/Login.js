import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {page_ID__Set} from '../../redux/actions/page';
import {login, logout} from '../../redux/actions/auth';
import clear_localStorage from '../../functions/localStorage/clear_localStorage';
import cookie_logout from '../../functions/logout/cookie_logout';
import server_login_user from '../../functions/login/server_login_user';
import server_login_business from '../../functions/login/server_login_business';


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            type: 'business',
            formError: ''
        };

        this.handle_logout();
    };

    componentWillMount() {
        this.props.page_ID__Set('Login');
        clear_localStorage();
        cookie_logout();
    };

    /** Handler for account type input field */
    set_account_type = (type) => {
        this.setState({
            ...this.state,
            type: type,
            formError: ''
        });
    }

    /** Handler for email input field */
    set_email = (email) => {
        this.setState({
            ...this.state,
            formError: '',
            email: email
        });
    }

    /** Handler for password input field */
    set_password = (password) => {
        this.setState({
            ...this.state,
            formError: '',
            password: password
        });
    }

    /** Handle login form submission */
    handle_login = () => {
        if (this.state.type === 'user') this.handle_login_user();
        else if (this.state.type === 'business') this.handle_login_business();
        else this.handle_form_error('Something went wrong on our end. Try again in a few minutes.');
    }

    /** Handles login for User account */
    handle_login_user = () => {
        server_login_user({
            email: this.state.email, password: this.state.password
        })
        .then((user) => {
            console.log('user after login', user);
            return user;
        })
        .then((user) => {
            console.log('user after login', user)
            this.props.login(user);
            this.props.history.push('/dashboard');
        })
        .catch((err) => {
            console.log(err);
            return false;
        });

        console.log('Here is account', account);
    }

    /** Handles login for Business account */
    handle_login_business = () => {
        server_login_business({
            email: this.state.email, password: this.state.password
        })
        .then((business) => {
            console.log('business after login', business);
            if (!business) throw new Error('Business not logged in');
            return business;
        })
        .then((business) => {
            this.props.login(business);
            this.props.history.push('/dashboard');
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
    }

    /** Handles form error */
    handle_form_error = (errorMessage) => {
        console.log('Handle form error called')
        this.setState({
            ...this.state,
            formError: errorMessage
        });

        setTimeout(() => {
            this.clear_formError();
        }, 2000)
    }

    /** Clears form error */
    clear_form_error = () => {
        console.log('Clear form error called')
        if (this.state.formError) {
            this.setState({
                ...this.state,
                formError: ''
            });    
        }
    }

    /**
     *  A User cannot access the login route unless they are not logged into
     *  the server, so the cookies and local_storage must be cleared.
     */
    handle_logout = () => {
        this.props.logout();
        cookie_logout();
        clear_localStorage();
    }

    render() {
        return (
            <div id="Login">
                <div 
                    className="Login__form"
                >
                    <div className="Login__account-type">
                        <label htmlFor="account_type">I am addd...</label>

                        <select 
                            name="account_type" 
                            id="account_type"
                            onChange={(e) => this.set_account_type(e.target.value)}
                        >
                            <option value="business">Business</option>
                            <option value="user">Athlete/Parent</option>
                        </select>
                    </div>

                    <div className="Login__field">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            onChange={(e) => this.set_email(e.target.value)}
                            required
                        />
                    </div>

                    <div className="Login__field">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            onChange={(e) => this.set_password(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div 
                        className="Login__error" 
                        data-active={!!this.state.formError}
                    >
                        {this.state.formError}
                    </div>


                    <button 
                        className="Login__button"
                        onClick={this.handle_login}
                    >
                        submit
                    </button>

                    <div>
                        <p className="Login__register">
                            Don't have an account?&nbsp;
                            <NavLink to="/register">
                                Register now.
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        );
    };
};


/* Connect to store */
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    }
}

const mapDispatchToProps = (dispatch) => ({
    page_ID__Set: (id) => {
        dispatch(page_ID__Set(id));
    },

    login: (account) => {
        dispatch(login(account));
    },

    logout: (account) => {
        dispatch(logout());
    } 
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);