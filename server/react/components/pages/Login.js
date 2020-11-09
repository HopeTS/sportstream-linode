/* Packages */
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';


/* Actions */
import {page_ID__Set} from '../../redux/actions/page';


/* Component */
export class Login extends React.Component {
    constructor(props) {
        super(props);
    };


    componentWillMount() {
        this.page_ID__Set('Login');
    };


    page_ID__Set = (id) => {
        this.props.page_ID__Set(id);
    };


    render() {
        return (
            <div id="Login">
                <form className="Login__form" action="/login" method="POST">
                    <div className="Login__field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required/>
                    </div>

                    <div className="Login__field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required/>
                    </div>

                    <div className="Login__account-type">
                        <label htmlFor="account_type">I am a...</label>
                        <select name="account_type" id="account_type">
                            <option value="business">Business</option>
                            <option value="user">Athlete/Parent</option>
                        </select>
                    </div>

                    <button className="Login__button" type="submit">submit</button>

                    <div>
                        <p className="Login__register">
                            Don't have an account? <NavLink to="/register">Register now.</NavLink>
                        </p>
                    </div>
                </form>
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