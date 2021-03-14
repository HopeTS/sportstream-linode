import React from 'react';
import { connect } from 'react-redux';

import {
    navMenu_Mobile__Off, accountMenu__Toggle
} from '../../../redux/actions/ui';
import AccountCardAuthMenuUser from './AccountCardAuthMenuUser';
import AccountCardAuthMenuBusiness from './AccountCardAuthMenuBusiness';


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
    accountMenu__Toggle: () => {
        dispatch(accountMenu__Toggle());
    }
});


/** Authenticated AccountCard content */
const AccountCardAuth = connect(
    mapStateToProps, mapDispatchToProps
)(function(props: any) {


    function accountMenuToggle() {
        props.accountMenu__Toggle();
    }


    return (
        <div className="AccountCardAuth">
            <button 
                className="AccountCardAuth__profileImage"
                onClick={accountMenuToggle}
            >
                <img src="/dist/images/icons/account.png" alt="" />
            </button>

            <div 
                className="AccountCardAuth__menu"
                data-active={props.accountMenu}
            >
                {props.account.type === 'user' ? 
                    <AccountCardAuthMenuUser />
                    :
                    <AccountCardAuthMenuBusiness />

                }
            </div>
        </div>
    );
});


export = AccountCardAuth;