import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
    navMenu_Mobile__Off, accountMenu__Off
} from '../../../redux/actions/ui';
import { logout } from '../../../redux/actions/auth';
import ClientStorage from '../../../functions/clientStorage/ClientStorage';
import Endpoint from '../../../functions/endpoint/Endpoint';


// Store config
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


/** AccountCard content for User accounts*/
const AccountCardAuthMenuUser = connect(
    mapStateToProps, mapDispatchToProps
)(function(props: any) {

    const clientStorage = new ClientStorage;
    const endpoint = new Endpoint;


    /** Logs user out */
    function logout(): void {
        accountMenuOff();
        clientStorage.clear();
        endpoint.user.logout();
        props.logout();
        return;
    }


    /** Handler for turning accountMenu off */
    function accountMenuOff(): void {
        props.accountMenu__Off();
    }


    return (
        <div 
            className="AccountCardAuthMenu"
            data-active={props.accountMenu}
        >
            <ul>
                <NavLink 
                    to="/Dashboard"
                    onClick={accountMenuOff}
                >
                    <li>
                        Dashboard
                    </li>
                </NavLink>

                <NavLink
                    to="/"
                    onClick={logout}
                >
                    <li>
                        Log out
                    </li>
                </NavLink>
            </ul>
        </div>
    );
});


export = AccountCardAuthMenuUser;