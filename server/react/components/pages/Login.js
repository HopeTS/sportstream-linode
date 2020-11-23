/* Packages */
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


/* Actions */
import {page_ID__Set} from '../../redux/actions/page';
import {login} from '../../redux/actions/auth';


/* Component */
export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            type: '',
            login_failure: false
        };
    };


    componentWillMount() {
        this.props.page_ID__Set('Login');

    };

    setEmail(email) {
        /** Controls email field */

        this.setState({
            ...this.state,
            login_failure: false,
            email: email
        });
    }

    setPassword = (password) => {
        /** Controls password field */

        this.setState({
            ...this.state,
            login_failure: false,
            password: password
        });
    }

    login = (e) => {
        /**
         *  Form submission function. The account credentials are sent to the
         *  server, passes to login_failed() or login_succeeded()
         */

        e.preventDefault();

        // POST login request to server
        axios.post('/login', { 
            email: this.state.email,
            password: this.state.password
        })

        // If login successful
        .then((res) => {
            //  TODO: Update store
            //  res.data.name
            //  res.data.email
            this.props.login({
                name: res.data.name,
                email: res.data.email,
                type: res.data.type
            });

            // Redirect
            this.props.history.push('/');
        })

        // If login failure
        .catch((err) => {
            // Clear input
            document.querySelector('#email').value = '';
            document.querySelector('#password').value = '';
            this.setState({
                ...this.state,
                login_failure: true
            })
        });
    }

    render() {
        return (
            <div id="Login">
                <div 
                    className="Login__form"
                    data-active={!this.state.login_}
                >
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

                <div className="Login__failure" data-active={
                    this.state.login_failure
                }>
                    login failed
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


export default connect(mapStateToProps, mapDispatchToProps)(Login);