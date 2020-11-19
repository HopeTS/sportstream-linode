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
            type: ''
        };
    };


    componentWillMount() {
        this.props.page_ID__Set('Login');
    };

    setEmail = (email) => {
        this.setState({
            ...this.state,
            email: email
        });
    }

    setPassword = (password) => {
        this.setState({
            ...this.state,
            password: password
        });
    }

    login = () => {
        axios({ // POST login
            method: "POST",
            data: {
                email: this.state.email,
                password: this.state.password
            },
            withCredentials: true,
            url: `${window.location.origin}/login`,
        }).then((res) => {
            // If login unsuccessful
            if (res.status !== 202) {
                return console.log('Authentication failed');
            }

            // If login successful
            // TODO: Store username, type and genkey from server into redux
            this.props.login({
                name: res.data.name,
                email: res.data.email,
                type: res.data.type
            })
            return console.log('Authentication succeeded!');
        });
    }

    render() {
        return (
            <div id="Login">
                <div className="Login__form">
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
                            Don't have an account? <NavLink to="/register">Register now.</NavLink>
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


export default connect(mapStateToProps, mapDispatchToProps)(Login);