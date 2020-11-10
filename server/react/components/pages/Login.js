/* Packages */
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


/* Actions */
import {page_ID__Set} from '../../redux/actions/page';


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
        this.page_ID__Set('Login');
    };


    page_ID__Set = (id) => {
        this.props.page_ID__Set(id);
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

    setType = (type) => {
        this.setState({
            ...this.state,
            type: type
        });
    }

    login = () => {
        axios({
            method: "POST",
            data: {
                email: this.state.email,
                password: this.state.password
            },
            withCredentials: true,
            url: `${window.location.origin}/login`,
        }).then((res) => console.log(res))
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

                    <div className="Login__account-type">
                        <label htmlFor="account_type">I am a...</label>
                        <select 
                            name="account_type" 
                            id="account_type"
                            onChange={(e) => this.setType(e.target.value)}
                        >
                            <option value="business">Business</option>
                            <option value="user">Athlete/Parent</option>
                        </select>
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
const mapDispatchToProps = (dispatch) => ({
    page_ID__Set: (id) => {
        dispatch(page_ID__Set(id));
    }
});


export default connect(undefined, mapDispatchToProps)(Login);