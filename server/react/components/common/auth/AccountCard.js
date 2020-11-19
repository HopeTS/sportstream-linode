import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import Navigation from '../../ui/Navigation';
import {navMenu_Mobile__Off} from '../../../redux/actions/ui';

export class AccountCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            username: '',
            type: ''
        }
    }

    mobile_nav = () => {
        if (this.props.mobile_nav) {
            /* Disable scrolling */
            const html = document.getElementsByTagName('HTML')[0];
            html.setAttribute('data-Mobile_Nav', 'false');

            /* Dispatch */
            this.props.navMenu_Mobile__Off();
        }
    }

    render() {
        return (
            <div id="AccountCard" data-mobile_nav={this.props.mobile_nav}>
                {this.props.isAuthenticated ?
                    <div className="AccountCard__auth">
                        Hi, {this.props.account.name}
                    </div>
                    :
                    <NavLink to="/login" onClick={this.mobile_nav}>
                        <div className="AccountCard__noAuth">
                            Sign in
                        </div>
                    </NavLink>
                }
            </div>
        );
    };
};

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