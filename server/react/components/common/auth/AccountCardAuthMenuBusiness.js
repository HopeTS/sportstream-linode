/* External packages */
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';


/* Internal packages */
import {navMenu_Mobile__Off} from '../../../redux/actions/ui';


/**
 * The account options dropdown list for User accounts. 
 * @prop active: Whether or not the menu is displayed
 */
export class AccountCardAuthMenuBusiness extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="AccountCardAuthMenu">
                
            </div>
        );    
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountCardAuthMenuBusiness);
