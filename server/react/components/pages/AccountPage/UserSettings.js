import React from 'react';
import {connect} from 'react-redux';

export function UserSettings() {
    return (
        <div className="AccountPageSettings">

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    }
}

export default connect(mapStateToProps, undefined)(UserSettings);