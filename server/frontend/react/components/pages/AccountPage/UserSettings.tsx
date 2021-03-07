import React from 'react';
import {connect} from 'react-redux';


/** Settings section for Business account */
function component() {
    return (
        <div className="AccountPageSettings">
            {/* TODO */}
        </div>
    );
}



// Connect to store
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    }
}


const UserSettings = connect(mapStateToProps, undefined)(component);
export = UserSettings;