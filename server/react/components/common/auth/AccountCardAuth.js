/* External packages */
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';


/* Internal packages */
import {navMenu_Mobile__Off} from '../../../redux/actions/ui';


/**
 * Component */
export class AccountCardAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
    }

    toggleMenu = () => {
        this.setState({
            menu: !this.state.menu
        });
    }

    render() {
        return (
            <div className="AccountCardAuth">
                <p className="AccountCardAuth__greeting">
                    Hello, {this.props.name ? this.props.name : 'stranger'}
                </p>

                <button className="AccountCardAuth__profileImage">
                    <img src="/dist/images/icons/account.png" alt="" />
                </button>
            </div>
        )
    }
}


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

export default connect(mapStateToProps, mapDispatchToProps)(AccountCardAuth);
