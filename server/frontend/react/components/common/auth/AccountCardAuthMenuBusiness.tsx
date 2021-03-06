export {};
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {
    navMenu_Mobile__Off, accountMenu__Off
} from '../../../redux/actions/ui';
import { logout } from '../../../redux/actions/auth';
import ClientStorage from '../../../functions/clientStorage/ClientStorage';
import Endpoint from '../../../functions/endpoint/Endpoint';


/** AccountCard content for Business accounts*/
export class AccountCardAuthMenuBusiness extends React.Component {

    clientStorage: ClientStorage;
    endpoint: Endpoint;
    props: any;


    constructor(props: any) {
        super(props);
        this.clientStorage = new ClientStorage;
        this.endpoint = new Endpoint;
    }


    /** Log user out */
    private logout(): void {
        this.accountMenuOff();
        this.clientStorage.clear();
        this.endpoint.business.logout();
        this.props.logout();
        return;
    }


    /** Handler for turning account menu off */
    private accountMenuOff(): void {
        this.props.accountMenu__Off();
        return;
    }


    render() {
        return (
            <div 
                className="AccountCardAuthMenu"
                data-active={this.props.accountMenu}
            >
                <ul>
                    <NavLink 
                        to="/dashboard"
                        onClick={this.accountMenuOff}
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


// Connect to store
const mapStateToProps = (state) => {
    console.log(state)
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


export default connect(mapStateToProps, mapDispatchToProps)(AccountCardAuthMenuBusiness);