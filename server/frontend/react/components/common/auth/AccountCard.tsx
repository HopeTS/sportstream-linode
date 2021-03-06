export {};
import React from 'react';
import {connect} from 'react-redux';

import {
    navMenu_Mobile__Off, accountMenu__Toggle
} from '../../../redux/actions/ui';
import AccountCardAuth from './AccountCardAuth';
import AccountCardNoAuth from './AccountCardNoAuth';


/** Root AccountCard component */
export class AccountCard extends React.Component {

    state: {
        auth: boolean
    };
    props: any;


    constructor(props: any) {
        super(props);
        this.state = {
            auth: false
        };
    }


    /** Toggles mobile nav redux state */
    private mobile_nav(): void {
        if (this.props.mobile_nav) {

            // Disable scrolling
            const html = document.getElementsByTagName('HTML')[0];
            html.setAttribute('data-Mobile_Nav', 'false');

            // Dispatch
            this.props.navMenu_Mobile__Off();
        }

        return;
    }


    render() {
        return (
            <div 
                id="AccountCard" 
                data-mobile_nav={this.props.mobile_nav}
                data-active={this.props.accountMenu}
                onClick={this.mobile_nav}
            >
                {this.props.isAuthenticated ?
                    <AccountCardAuth />
                    :
                    <AccountCardNoAuth />
                }
            </div>
        );
    };
}


// Connect to store
const mapStateToProps = (state: any): any => {
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountCard);