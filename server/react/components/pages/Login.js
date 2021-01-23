import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {page_ID__Set} from '../../redux/actions/page';
import {login, logout} from '../../redux/actions/auth';
import {clearState} from '../../functions/auth/localStorage';
import {clearCookies} from '../../functions/auth/cookies';


/* Component */
export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            type: 'business',
            form_error: ''
        };

        this.handleLogout();
    };

    componentWillMount() {
        this.props.page_ID__Set('Login');

    };

    /** Handler for account type input field */
    setAccountType = (type) => {
        this.setState({
            ...this.state,
            type: type,
            form_error: ''
        });
    }

    /** Handler for email input field */
    setEmail = (email) => {
        this.setState({
            ...this.state,
            form_error: '',
            email: email
        });
    }

    /** Handler for password input field */
    setPassword = (password) => {
        this.setState({
            ...this.state,
            form_error: '',
            password: password
        });
    }

    /** Handle login form submission */
    login = () => {
        if (this.state.type === 'user') this.loginUser();
        else if (this.state.type === 'business') this.loginBusiness();
        else this.handleFormError('Something went wrong on our end. Try again in a few minutes.');
    }

    /** Handles login for Business account */
    loginBusiness = () => {
        axios.post('/login-business', { 
            email: this.state.email,
            password: this.state.password
        })
        
        .then((res) => {
            if (res.status === 202) {
                const stream_key = res.data.stream_key || [];
                const connection_id = res.data.connection_id || [];
                this.props.login({
                    name: res.data.name,
                    email: res.data.email,
                    stream_key: stream_key,
                    connection_id: connection_id,
                    type: 'business'
                });
                this.props.history.push('/');
            }

            else {
                this.handleFormError('Something went wrong on our end. Try again in a few minutes.');
            }
        })

        .catch((err) => {
            if (err.response.status === 404) {
                return this.handleFormError("Invalid email/password");
            }
            return this.handleFormError(error.response.status);
        });
    }

    /** Handles login for User account */
    loginUser = () => {
        axios.post('/login-user', { 
            email: this.state.email,
            password: this.state.password
        })
        
        .then((res) => {
            if (res.status === 202) {
                this.props.login({
                    name: res.data.name,
                    email: res.data.email,
                    type: 'user'
                });
                this.props.history.push('/');
            }

            else {
                this.handleFormError('Something went wrong on our end. Try again in a few minutes.');
            }
        })

        .catch((error) => {
            console.log(error);
            let errorMessage = error.response ? 
                error.response.data : 'Something went wrong';
            this.handleFormError(errorMessage);
        });
    }

    /** Handles form error */
    handleFormError = (errorMessage) => {
        console.log('Handle form error called')
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
        console.log('Clear form error called')
        if (this.state.form_error) {
            this.setState({
                ...this.state,
                form_error: ''
            });    
        }
    }

    /**
     *  A User cannot access the login route unless they are not logged into
     *  the server, so the cookies and localStorage must be cleared.
     */
    handleLogout = () => {
        this.props.logout();
        clearCookies();
        clearState();
    }

    render() {
        return (
            <div id="Login">
                <div 
                    className="Login__form"
                    data-active={!this.state.login_}
                >
                    <div className="Login__account-type">
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

                    <div className="Login__field">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            onChange={(e) => this.setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="Login__field">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            onChange={(e) => this.setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div 
                        className="Login__error" 
                        data-active={!!this.state.form_error}
                    >
                        {this.state.form_error}
                    </div>


                    <button 
                        className="Login__button"
                        onClick={this.login}
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