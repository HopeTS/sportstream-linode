import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import AccountPageSettings from './AccountPageSettings';

/**
 * Content of account settings dashboard for a standard user account
 */
export class AccountPageAuth extends React.Component {
    constructor(props) {
        super(props);
    };

    componentWillMount() {

    };

    render() {
        const accountType = this.props.account.type === 'business' ? 
            'business':'user';
        return (
            <div className="AccountPageAuth">
                <div className="AccountPageAuth__header">
                    <h1>
                        Account Dashboard
                    </h1>
                </div>
                <div className="AccountPageAuth__content">
                    <AccountPageSettings />
                </div>
            </div>
        );
    };
};


/* Connect to store */
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    }
}

const mapDispatchToProps = (dispatch) => ({
    page_ID__Set: (id) => {
        dispatch(page_ID__Set(id));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(AccountPageAuth);