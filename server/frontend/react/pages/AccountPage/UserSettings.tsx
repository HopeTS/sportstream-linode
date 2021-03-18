import React from 'react';
import {connect} from 'react-redux';


// Store config
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    }
}


/** Settings section for Business account */
const UserSettings = connect(
    mapStateToProps, undefined
)(function() {
    return (
        <div className="AccountPageSettings">
            {/* TODO */}
        </div>
    );
});


export = UserSettings;