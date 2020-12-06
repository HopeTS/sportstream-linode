/* External packages */
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';


/* Internal packages */
import {navMenu_Mobile__Off} from '../../../redux/actions/ui';


/* Component */
export class AccountCardAuth extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="AccountCardAuth">
                Auth!
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
