import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {navMenu_Mobile__Off} from '../../../redux/actions/ui';
import AccountCardAuth from './AccountCardAuth';
import AccountCardNoAuth from './AccountCardNoAuth';


/**
 * Master AccountCard component. Contains the login/sign up buttons for 
 * unauthenticated users and account picture and menu for authenticated users.
 * 
 * @prop mobile_nav: Whether or not mobile nav menu is up
 */
export class AccountCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            menu: false
        }
    }

    /**
     * Toggles the mobile nav redux state if user clicks a link in the
     * AccountCard while the mobile  nav is up
     */
    mobile_nav = () => {
        if (this.props.mobile_nav) {
            // Disable scrolling
            const html = document.getElementsByTagName('HTML')[0];
            html.setAttribute('data-Mobile_Nav', 'false');

            // Dispatch
            this.props.navMenu_Mobile__Off();
        }
        return;
    }

    /**
     * Toggles the account card menu display
     */
    toggle_card = () => {
        this.setState({
            menu: !this.state.menu
        });
    }

    render() {
        return (
            <div id="AccountCard" 
                data-mobile_nav={this.props.mobile_nav}
                data-active={this.state.menu}

            >
                {this.props.isAuthenticated ?
                    <AccountCardAuth />
                    :
                    <AccountCardNoAuth />
                }
            </div>
        );
    };
};


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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountCard);