/* External packages */
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';


/* Internal packages */
import {navMenu_Mobile__Off} from '../../../redux/actions/ui';


/**
 * The React component for the account header menu when the user is not
 * logged in
 */
export class AccountCardNoAuth extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="AccountCardNoAuth">
                <div className="AccountCardNoAuth__links">
                    <NavLink
                        className="AccountCardNoAuth__login"
                        to="/login"
                    >
                        <div>
                            Log in
                        </div>
                    </NavLink>

                    <NavLink
                        className="AccountCardNoAuth__register"
                        to="/register"
                    >
                        <div>
                            Register
                        </div>
                    </NavLink>
                </div>
            </div>
        )
    }
}


/* Connect to store */
const mapStateToProps = (state) => {
    return {
        mobile_nav: state.ui.navMenu_Mobile,
    };
};

const mapDispatchToProps = (dispatch) => ({
    navMenu_Mobile__Off: () => {
        dispatch(navMenu_Mobile__Off());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountCardNoAuth);
