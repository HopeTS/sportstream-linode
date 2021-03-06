export {};
import React from 'react';
import { connect } from 'react-redux';

import {
    navMenu_Mobile__Off, accountMenu__Toggle
} from '../../../redux/actions/ui';
import AccountCardAuthMenuUser from './AccountCardAuthMenuUser';
import AccountCardAuthMenuBusiness from './AccountCardAuthMenuBusiness';


/** Authenticated AccountCard content */
export class AccountCardAuth extends React.Component {

    state: {
        menu: boolean
    };
    props: any;


    constructor(props: any) {
        super(props);
        this.state = {
            menu: false
        }
    }


    /** Toggle AccountMenu */
    private accountMenuToggle() {
        this.props.accountMenu__Toggle();
    }


    render() {
        return (
            <div className="AccountCardAuth">
                <button 
                    className="AccountCardAuth__profileImage"
                    onClick={this.accountMenuToggle}
                >
                    <img src="/dist/images/icons/account.png" alt="" />
                </button>

                <div 
                    className="AccountCardAuth__menu"
                    data-active={this.props.accountMenu}
                >
                    {this.props.account.type === 'user' ? 
                        <AccountCardAuthMenuUser />
                        :
                        <AccountCardAuthMenuBusiness />

                    }
                </div>
            </div>
        );
    }
}


// Connect to store
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


export default connect(mapStateToProps, mapDispatchToProps)(AccountCardAuth);