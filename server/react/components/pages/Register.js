/* Packages */
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


/* Actions */
import {page_ID__Set} from '../../redux/actions/page';


/* Component */
export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            type: 'business',
        };
    };


    componentWillMount() {
        this.page_ID__Set('Register');
    };


    page_ID__Set = (id) => {
        this.props.page_ID__Set(id);
    };

    setName = (name) => {
        this.setState({
            ...this.state,
            name: name
        });
    }

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

    setAccountType = (type) => {
        this.setState({
            ...this.state,
            type: type
        });
    }

    register = () => {
        axios({
            method: "post",
            data: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                type: this.state.type
            },
            withCredentials: true,
            url: `${window.location.origin}/register`,
        }).then((res) => console.log(res))
    }

    render() {
        return (
            <div id="Register">
                <div className="Register__form">
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
                        <label>Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            onChange={(e) => this.setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        className="Register__button"
                        onClick={this.register}
                    >
                        submit
                    </button>

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
const mapDispatchToProps = (dispatch) => ({
    page_ID__Set: (id) => {
        dispatch(page_ID__Set(id));
    }
});


export default connect(undefined, mapDispatchToProps)(Register);