import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import {
    navMenu_Mobile__Off, accountMenu__Off
} from '../../../redux/actions/ui';
import { logout } from '../../../redux/actions/auth';
import clear_localStorage from '../../../functions/localStorage/clear_localStorage';
import cookie_logout from '../../../functions/logout/cookie_logout';
import server_logout from '../../../functions/logout/server_logout';

/**
 * The account options dropdown list for User accounts. 
 * @prop active: Whether or not the menu is displayed
 */
export class AccountCardAuthMenuUser extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Logs user out from server and clears local_storage and cookie 
     * authentication data
     */
    logout = () => {
        this.accountMenu__Off();

        // server logout
        axios.get('logout', {}).then((res) => {
            console.log('Here is the logout response')
            console.log(res)
        });

        // client logout
        clear_localStorage();
        cookie_logout();
        server_logout();
        this.props.logout();
    }

    /** Handler for turning accountMenu off */
    accountMenu__Off = () => {
        this.props.accountMenu__Off();
    }

    render() {
        return (
            <div 
                className="AccountCardAuthMenu"
                data-active={this.props.accountMenu}
            >
                <ul>
                    <NavLink 
                        to="/Dashboard"
                        onClick={this.accountMenu__Off}
                    >
                        <li>
                            Dashboard
                        </li>
                    </NavLink>

                    <NavLink
                        to="/"
                        onClick={this.logout}
                    >
                        <li>
                            Log out
                        </li>
                    </NavLink>
                </ul>
            </div>
        );    
    }
}


/* Connect to store */
const mapStateToProps = (state) => {
    return {
        mobile_nav: state.ui.navMenu_Mobile,
        accountMenu: state.ui.accountMenu,
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    };
};

const mapDispatchToProps = (dispatch) => ({
    navMenu_Mobile__Off: () => {
        dispatch(navMenu_Mobile__Off());
    },
    accountMenu__Off: () => {
        dispatch(accountMenu__Off());
    },
    logout: () => {
        dispatch(logout());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountCardAuthMenuUser);
