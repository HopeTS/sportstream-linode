/* External packages */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

/* Internal packages */
import { navMenu_Mobile__Off } from '../../../redux/actions/ui';
import { logout } from '../../../redux/actions/auth';
import { clearState } from '../../../auth/localStorage';
import { clearCookies } from '../../../auth/cookies';

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
        clearState();
        clearCookies();
        this.props.logout();
    }

    render() {
        return (
            <div className="AccountCardAuthMenu">
                <ul>
                    
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
