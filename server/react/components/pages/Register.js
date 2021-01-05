import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {page_ID__Set} from '../../redux/actions/page';


/* Component */
export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            business_key: '',
            connection_id: '',
            business_password: '',
            type: 'business',
            form_error: ''
        };
    };

    componentWillMount() {
        this.props.page_ID__Set('Register');
    };

    /**
     *  Handler for business key input field
     * 
     *  The business enters this password, and it must match the password set in
     *  the config of the express server in order for the business account to 
     *  successfully register
     */
    setBusinessKey = (business_key) => {
        this.setState({
            ...this.state,
            business_key: business_key
        });

        this.clearFormError();
    }

    /**
     *  Handler for connection id input field
     * 
     *  The business account sets this field, it's given out to users to give
     *  them access to the business streams
     */
    setConnectionId = () => {
        this.setState({
            ...this.state,
            connection_id: connection_id
        });

        this.clearFormError();
    }

    /**
     *  Handler for business password input field
     * 
     *  The user account sets this field, it's entered by the users then matched
     *  with the corresponding business' connection_id to give the user access
     *  to the business streams
     */
    setBusinessPassword = (business_password) => {
        this.setState({
            ...this.state,
            business_password: business_password
        });

        this.clearFormError();
    }

    /** Handler for name input field */
    setName = (name) => {
        this.setState({
            ...this.state,
            name: name
        });

        this.clearFormError();
    }

    /** Handler for email input field */
    setEmail = (email) => {
        this.setState({
            ...this.state,
            email: email
        });

        this.clearFormError();
    }

    /** Handler for password input field */
    setPassword = (password) => {
        this.setState({
            ...this.state,
            password: password
        });

        this.clearFormError();
    }

    /** Handler for account type input field */
    setAccountType = (type) => {
        this.setState({
            ...this.state,
            type: type
        });

        this.clearFormError();
    }

    /** Handle registration form submission */
    register = () => {
        if (this.state.type === 'business') {
            this.registerBusiness();
        } else {
            this.registerUser();
        }
    }

    /** Handle registration for business account */
    registerBusiness = () => {
        axios({
            method: "post",
            data: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            },
            withCredentials: true,
            url: `${window.location.origin}/register-${this.state.type}`,
        }).then((res) => {

            // If account was created
            if (res.status === 201) {
                // TODO: Login
                // TODO: Add 'Go to my account' button
                console.log('Business created');
                console.log(res);
            }

            // If invalid business key was entered
            else if (res.status == 401) {
                // TODO: Put 'Invalid business key' message
            }

            // If account already exists
            else if (res.status === 409) {
                // TODO: Put 'Account already exists' message
            }

            // If server has issues
            else if (res.status === 500) {
                // TODO: Add 'server issues' message
            }

            // Other error
            else {
                // TODO: Add 'Something went wrong. Try again in a few 
                // minutes' message
            }
        });
    }

    /** Handle registration for user account */
    registerUser = () => {
        axios({
            method: "post",
            data: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                business_password: this.state.business_password
            },
            withCredentials: true,
            url: `${window.location.origin}/register-user`,
        }).then((res) => {

            // If account was created
            if (res.status === 201) {
                // TODO: Login
                // TODO: Add 'Go to my account' button
                console.log('User created');
                console.log(res);
            }

            // If invalid business key was entered
            else if (res.status == 401) {
                // TODO: Put 'Invalid business key' message
            }

            // If account already exists
            else if (res.status === 409) {
                // TODO: Put 'Account already exists' message
            }

            // If server has issues
            else if (res.status === 500) {
                // TODO: Add 'server issues' message
            }

            // Other error
            else {
                // TODO: Add 'Something went wrong. Try again in a few 
                // minutes' message
            }
        });
    }

    /** Handles form error */
    handleFormError = (errorMessage) => {
        this.setState({
            ...this.state,
            form_error: errorMessage
        });

        setTimeout(() => {
            this.clearFormError();
        }, 2000)
    }

    /** Clears form error */
    clearFormError = () => {
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
                        <label htmlFor="account_type">I am a... </label>
                        
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
                            onChange={(e) => this.setBusinessPassword(e.target.value)}
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
                            onChange={(e) => this.setBusinessKey(e.target.value)}
                        />
                    </div>

                    <div
                        className="Register__field"
                        data-type="business"
                        data-active={this.state.type === 'business'}
                    >
                        <label htmlFor="connectionID">Connection ID</label>
                        <input 
                            type="text"
                            name="connection_id"
                            id="connection_id"
                            onChange={(e) => this.setConnectionId(e.target.value)}
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