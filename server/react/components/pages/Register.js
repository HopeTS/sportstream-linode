import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {page_ID__Set} from '../../redux/actions/page';
import {login} from '../../redux/actions/auth';
import clear_localStorage from '../../functions/localStorage/clear_localStorage';
import cookie_logout from '../../functions/logout/cookie_logout';
import server_login_user from '../../functions/login/server_login_user';
import server_login_business from '../../functions/login/server_login_business';
import server_register_user from '../../functions/register/server_register_user';
import server_register_business from '../../functions/register/server_register_business'; 

/* Component */
export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            business_key: '',
            type: 'starter',
            form_error: ''
        };
    };

    componentWillMount() {
        this.props.page_ID__Set('Register');
        clear_localStorage();
        cookie_logout();
    };

    /**
     *  Handler for business key input field
     * 
     *  The business enters this password, and it must match the password set in
     *  the config of the express server in order for the business account to 
     *  successfully register
     */
    set_business_key = (business_key) => {
        this.setState({
            ...this.state,
            business_key: business_key
        });

        this.clear_form_error();
    }

    /** Handler for name input field */
    set_name = (name) => {
        this.setState({
            ...this.state,
            name: name
        });

        this.clear_form_error();
    }

    /** Handler for email input field */
    set_email = (email) => {
        this.setState({
            ...this.state,
            email: email
        });

        this.clear_form_error();
    }

    /** Handler for password input field */
    set_password = (password) => {
        this.setState({
            ...this.state,
            password: password
        });

        this.clear_form_error();
    }

    /** Handler for account type input field */
    set_account_type = (type) => {
        this.setState({
            ...this.state,
            type: type
        });

        this.clear_form_error();
    }

    /** Handle registration form submission */
    register = () => {
        if (this.state.type === 'business') {
            this.handle_register_business();
        } else {
            this.handle_register_user();
        }
    }

    /** Handle registration for business account */
    handle_register_business = () => {

        server_register_business({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            business_key: this.state.business_key
        })

        .then((res) => {
            
            // Error handling
            if (typeof business === 'string') {
                this.handle_form_error(res);
                return;
            }

            if (!res) throw new Error();

            this.handle_login_business(business.email, business.password);
            return;
        })

        .catch((error) => {
            this.handle_form_error(
                'Something went wrong on our end. Please try again \
                in a few minutes.'
            );
            return;
        })
    }

    /** 
     * Handles login for Business account 
     * 
     * @param {string} email account email address
     * @param {string} password account password
     * 
     */
    handle_login_business = (email, password) => {
        server_login_business({
            email: email,
            password: password
        })

        .then((res) => {
            console.log('front end business login succccess', res);
            this.props.history.push('/dashboard');
            return;
        })

        .catch((err) => {
            console.log('something went wrong handle business login');
            return;
        })
    }

    /** Handle registration for user account */
    handle_register_user = () => {
        server_register_user({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            business_password: this.state.business_password
        })
        
        .then((res) => {

            // Error handling
            if (typeof business === 'string') {
                this.handle_form_error(res);
                return;
            }

            if (!res) throw new Error();

            this.handle_login_user(account.email, account.password);
        })

        .catch((error) => {
            this.handle_form_error(
                'Something went wrong on our end. Try again \
                in a few minutes.'
            );
        });
    }

    /** 
     * Handles login for User account 
     * 
     * @param {string} email account email address
     * @param {string} password account password
     */
    handle_login_user = (email, password) => {
        server_login_user({
            email: email,
            password: password
        })

        .then((res) => {
            console.log('front end user login succccess', res);
            this.props.history.push('/dashboard')
        })

        .catch((err) => {
            console.log('something went wrong handle user login')
        })
    }

    /** Handles form error */
    handle_form_error = (errorMessage) => {
        this.setState({
            ...this.state,
            form_error: errorMessage
        });

        setTimeout(() => {
            this.clear_form_error();
        }, 2000)
    }

    /** Clears form error */
    clear_form_error = () => {
        if (this.state.form_error) {
            this.setState({
                ...this.state,
                form_error: ''
            });    
        }
    }

    render() {
        return (
            <div id="Register">
                <div className="Register__form">
                    <div className="Register__account-type">
                        <label htmlFor="account_type">I am a...</label>
                        
                        <select 
                            name="account_type" 
                            id="account_type"
                            onChange={(e) => this.set_account_type(e.target.value)}
                        >
                            <option value="starter" selected>
                                Select an account type...
                            </option>
                            <option value="business">Business</option>
                            <option value="user">Athlete/Parent</option>
                        </select>
                    </div>

                    <div 
                        className="Register__field"
                        data-active={this.state.type !== 'starter'}
                    >
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            onChange={(e) => this.set_name(e.target.value)}
                            required
                        />
                    </div>

                    <div 
                        className="Register__field"
                        data-active={this.state.type !== 'starter'}
                    >
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            onChange={(e) => this.set_email(e.target.value)}
                            required
                        />
                    </div>

                    <div 
                        className="Register__field"
                        data-active={this.state.type !== 'starter'}
                    >
                        <label>Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            onChange={(e) => this.set_password(e.target.value)}
                            required
                        />
                    </div>

                    <div 
                        className="Register__field"
                        data-type="business"
                        data-active={this.state.type === 'business'}
                    >
                        <label htmlFor="businessKey">Business Key</label>
                        <input 
                            type="text"
                            name="business_key"
                            id="business_key"
                            onChange={(e) => this.set_business_key(e.target.value)}
                        />
                    </div>

                    <button 
                        className="Register__button"
                        onClick={this.register}
                        data-active={this.state.type !== 'starter'}
                    >
                        submit
                    </button>

                    <div 
                        className="Register__error"
                        data-active={!!this.state.form_error}
                    >
                        <p>{this.state.form_error}</p>
                    </div>

                    <div>
                        <p className="Register__login">
                            Already have an account? <NavLink to="/login">Sign in.</NavLink>
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
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);