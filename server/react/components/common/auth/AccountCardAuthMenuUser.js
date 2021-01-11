import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { navMenu_Mobile__Off } from '../../../redux/actions/ui';
import { logout } from '../../../redux/actions/auth';
import { clearState } from '../../../functions/auth/localStorage';
import { clearCookies } from '../../../functions/auth/cookies';

/**
 * The account options dropdown list for User accounts. 
 * @prop active: Whether or not the menu is displayed
 */
export class AccountCardAuthMenuUser extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Logs user out from server and clears localStorage and cookie 
     * authentication data
     */
    logout = () => {
        // server logout
        axios.get('logout', {}).then((res) => {
            console.log('Here is the logout response')
            console.log(res)
        });

        // client logout
        clearState();
        clearCookies();
        this.props.logout();
    }

    render() {
        return (
            <div 
                className="AccountCardAuthMenu"
                data-active={this.props.active}
            >
                <ul>
                    <li>
                        <NavLink 
                            to="/account"
                        >
                            My account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            onClick={this.logout}
                        >
                            Log out
                        </NavLink>
                    </li>
                </ul>
            </div>
        );    
    }
}


/* Connect to store */
const mapStateToProps = (state) => {
    return {
        mobile_nav: state.ui.navMenu_Mobile,
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    };
};

const mapDispatchToProps = (dispatch) => ({
    navMenu_Mobile__Off: () => {
        dispatch(navMenu_Mobile__Off());
    },
    logout: () => {
        dispatch(logout());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountCardAuthMenuUser);
