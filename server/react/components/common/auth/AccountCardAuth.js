/* External packages */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


/* Internal packages */
import {
    navMenu_Mobile__Off, accountMenu__Toggle
} from '../../../redux/actions/ui';
import AccountCardAuthMenuUser from './AccountCardAuthMenuUser';
import AccountCardAuthMenuBusiness from './AccountCardAuthMenuBusiness';


/* Component */
export class AccountCardAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
    }

    accountMenu__Toggle = () => {
        this.props.accountMenu__Toggle();
    }

    render() {
        return (
            <div className="AccountCardAuth">
                <button 
                    className="AccountCardAuth__profileImage"
                    onClick={this.accountMenu__Toggle}
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
        )
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
    accountMenu__Toggle: () => {
        dispatch(accountMenu__Toggle());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountCardAuth);
