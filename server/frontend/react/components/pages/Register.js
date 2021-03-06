import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {page_ID__Set} from '../../redux/actions/page';
import {login} from '../../redux/actions/auth';

import Validation from '../../functions/validation/Validation';
import Endpoint from '../../functions/endpoint/Endpoint';
import ClientStorage from '../../functions/clientStorage/ClientStorage';


/* Component */
export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.validation = new Validation;
        this.endpoint = new Endpoint;
        this.clientStorage = new ClientStorage;

        this.state = {
            name: '',
            email: '',
            password: '',
            passwordCheck: '',
            business_key: '',
            type: 'starter',
            form_error: ''
        };
    };

    componentWillMount() {
        this.props.page_ID__Set('Register');
        this.clientStorage.clear();
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

    set_password_check = (passwordCheck) => {
        this.setState({
            ...this.state,
            passwordCheck: passwordCheck
        });
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
        switch (this.state.type) {
            case 'business':
                this.handle_register_business();
                return;

            case 'user':
                this.handle_register_user();
                return;

            default:
                this.handle_form_error('Please select an account type.');
                return;
        }
    }

    /** Handle registration for business account */
    handle_register_business = () => {

        // Ensure passwords match
        if (this.state.password !== this.state.passwordCheck) {
            this.handle_form_error("Passwords don't match");
            return;
        }

        // Validate fields
        const validName = this.validation.name(this.state.name);
        const validEmail = this.validation.email(this.state.email);
        const validPassword = this.validation.password(this.state.password);
        if (!validName || !validEmail || !validPassword) { 
            this.handle_form_error('Invalid name, email or password');
            return;
        }

        else {
            this.endpoint.business.register({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                business_key: this.state.business_key
            })
    
            .then((business) => {
                
                // If registration successful
                if (typeof business !== 'string') {
                    console.log('Registration successful');
                    this.handle_login_business();
                    return;
                }

                else {
                    console.log('Registration unsuccessful');
                    this.handle_form_error(business);
                    return;
                }
            })
    
            .catch((error) => {
                this.handle_form_error(
                    'Something went wrong on our end. Please try again \
                    in a few minutes.'
                );
                return;
            })
        }
    }

    /** 
     * Handles login for Business account 
     * 
     * @param {string} email account email address
     * @param {string} password account password
     * 
     */
    handle_login_business = () => {
        this.endpoint.business.login({
            email: this.state.email, password: this.state.password
        })

        .then((business) => {

            // If login successful
            if (typeof business !== 'string') {
                console.log('Login successful');
                this.props.login(business);
                this.props.history.push('/dashboard');
                return;
            }

            // If predictable error
            else {
                console.log('Login unsuccessful');
                this.handle_form_error(business);
                return;
            }
        })

        .catch((err) => {
            console.warn(err);
            this.handle_form_error(
                'Something went wrong on our end. Try again in a few minutes.'
            );
            return false;
        })
    }

    /** Handle registration for user account */
    handle_register_user = () => {

        // Ensure passwords match
        if (this.state.password !== this.state.passwordCheck) {
            this.handle_form_error("Passwords don't match");
            return;
        }

        // Validate fields
        const validName = this.validation.name(this.state.name);
        const validEmail = this.validation.email(this.state.email);
        const validPassword = this.validation.password(this.state.password);
        if (!validName || !validEmail || !validPassword) {
            this.handle_form_error('Invalid name, email or password');
            return;
        }

        else {
            this.endpoint.user.register({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
            
            .then((user) => {

                // If registration successful
                if (typeof user !== 'string') {
                    console.log('Registration successful');
                    this.handle_login_user();
                    return;
                }
    
                else {
                    console.log('Registration unsuccessful');
                    this.handle_form_error(user);
                    return;
                }
            })
    
            .catch((error) => {
                this.handle_form_error(
                    'Something went wrong on our end. Try again \
                    in a few minutes.'
                );
                return;
            });
        }
    }

    /** 
     * Handles login for User account 
     * 
     * @param {string} email account email address
     * @param {string} password account password
     */
    handle_login_user = () => {
        this.endpoint.user.login({
            email: this.state.email, password: this.state.password
        })

        .then((user) => {

            // If login successful
            if (typeof user !== 'string') {
                console.log('Login successful');
                this.props.login(user);
                this.props.history.push('/dashboard');
            }

            // If predictable error
            else {
                console.log('Login unsuccessful');
                this.handle_form_error(user);
                return;
            }
        })

        // Thrown error handling
        .catch((err) => {
            console.warn(err);
            this.handle_form_error(
                'Something went wrong on our end. Try again in a few minutes.'
            );
            return false;
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
                            <option value="starter" defaultValue>
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
                        className="Register__field"
                        data-active={this.state.type !== 'starter'}
                    >
                        <label htmlFor="passwordCheck">Re-enter Password</label>
                        <input 
                            type="password"
                            id="passwordCheck"
                            name="passwordCheck"
                            onChange={
                                (e) => this.set_password_check(e.target.value)
                            }
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

                    <div 
                        className="Register__field"
                        data-active={this.state.type !== 'starter'}
                    >
                        <p className="Register__disclaimer">
                            By clicking Sign Up, you acknowledge that you have  
                            read and agree to the&nbsp;
                            <a 
                                target="_blank" 
                                rel="noopener" 
                                href="/legal/terms-of-use"
                            >
                                Terms of Use
                            </a>
                            &nbsp;and&nbsp;
                            <a 
                                target="_blank"
                                rel="noopener"
                                href="/legal/privacy-policy"
                            >
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>

                    <button 
                        className="Register__button"
                        onClick={this.register}
                        data-active={this.state.type !== 'starter'}
                    >
                        Sign Up
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