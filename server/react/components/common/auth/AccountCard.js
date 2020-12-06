/* External packages */
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';


/* Internal packages */
import {navMenu_Mobile__Off} from '../../../redux/actions/ui';
import AccountCardAuth from './AccountCardAuth';
import AccountCardNoAuth from './AccountCardNoAuth';


/* Component */
export class AccountCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {auth: false}
    }

    mobile_nav = () => {
        if (this.props.mobile_nav) {
            // Disable scrolling
            const html = document.getElementsByTagName('HTML')[0];
            html.setAttribute('data-Mobile_Nav', 'false');

            // Dispatch
            this.props.navMenu_Mobile__Off();
        }
    }

    render() {
        return (
            <div id="AccountCard" data-mobile_nav={this.props.mobile_nav}>
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