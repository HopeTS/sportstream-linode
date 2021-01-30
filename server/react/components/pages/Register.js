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
            business_password: '',
            type: 'business',
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

    /**
     *  Handler for business password input field
     * 
     *  The user account sets this field, it's entered by the users then matched
     *  with the corresponding business' connection_id to give the user access
     *  to the business streams
     */
    set_business_password = (business_password) => {
        this.setState({
            ...this.state,
            business_password: business_password
        });

        this.clear_form_error();
    }

    /** Handler for name input field */
    setName = (name) => {
        this.setState({
            ...this.state,
            name: name
        });

        this.clear_form_error();
    }

    /** Handler for email input field */
    setEmail = (email) => {
        this.setState({
            ...this.state,
            email: email
        });

        this.clear_form_error();
    }

    /** Handler for password input field */
    setPassword = (password) => {
        this.setState({
            ...this.state,
            password: password
        });

        this.clear_form_error();
    }

    /** Handler for account type input field */
    setAccountType = (type) => {
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
        const account = server_register_business({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            business_key: this.state.business_key
        })

        .then((business) => {
            console.log(business);
            if (!business) throw new Error();
            this.handle_login_business(business.email, business.password)
        })

        .catch((error) => {
            this.handle_form_error('Something went wrong on our end. Please try again in a few minutes.');
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
        })

        .catch((err) => {
            console.log('something went wrong handle business login')
        })
    }

    /** Handle registration for user account */
    handle_register_user = () => {
        server_login_user({
            email: this.state.email,
            password: this.state.password
        })
        
        .then((res) => {
            if (res.status === 201) {
                this.handle_login_user(
                    account.email,
                    account.password
                );
            }

            // Other error
            else {
                this.handle_form_error('Something went wrong on our end. Try again in a few minutes.');
            }
        })

        .catch((error) => {
            this.handle_form_error(error.response.data);
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
                            onChange={(e) => this.setAccountType(e.target.value)}
                        >
                            <option value="business">Business</option>
                            <option value="user">Athlete/Parent</option>
                        </select>
                    </div>

                    <div className="Register__field">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            onChange={(e) => this.setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="Register__field">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            onChange={(e) => this.setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="Register__field">
                        <label>Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            onChange={(e) => this.setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div 
                        className="Register__field"
                        data-type="user"
                        data-active={this.state.type === 'user'}
                    >
                        <label htmlFor="businessPassword">
                            Business password
                        </label>
                        <input 
                            type="text"
                            name="business_password"
                            id="business_password"
                            onChange={(e) => this.set_business_password(e.target.value)}
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