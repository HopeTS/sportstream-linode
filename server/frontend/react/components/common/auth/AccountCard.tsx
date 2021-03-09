import React from 'react';
import {connect} from 'react-redux';

import {
    navMenu_Mobile__Off, accountMenu__Toggle
} from '../../../redux/actions/ui';
import AccountCardAuth from './AccountCardAuth';
import AccountCardNoAuth from './AccountCardNoAuth';


// Store config
const mapStateToProps = (state: any) => {
    return {
        mobile_nav: state.ui.navMenu_Mobile,
        accountMenu: state.ui.accountMenu,
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    navMenu_Mobile__Off: () => {
        dispatch(navMenu_Mobile__Off());
    },
    accountMenu__Toggle: () => {
        dispatch(accountMenu__Toggle());
    }
});


/** Root AccountCard component */
const AccountCard = connect(
    mapStateToProps, mapDispatchToProps
)(function(props: any) {


    /** Toggles mobile nav redux state */
    function mobile_nav(): void {
        if (props.mobile_nav) {

            // Disable scrolling
            const html = document.getElementsByTagName('HTML')[0];
            html.setAttribute('data-Mobile_Nav', 'false');

            // Dispatch
            props.navMenu_Mobile__Off();
        }
    }


    return (
        <div 
            id="AccountCard" 
            data-mobile_nav={props.mobile_nav}
            data-active={props.accountMenu}
            onClick={mobile_nav}
        >
            {props.isAuthenticated ?
                <AccountCardAuth />
                :
                <AccountCardNoAuth />
            }
        </div>
    );
});


export = AccountCard;