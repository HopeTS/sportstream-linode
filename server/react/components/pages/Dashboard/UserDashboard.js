import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

export function UserDashboard() {
    return (
        <div className="UserDashboard">
            {props.account.type}
        </div>
    );
}


/* Connect to store */
const mapStateToProps = (state) => {
    return {
        account: state.auth.account
    };
};

const mapDispatchToProps = (dispatch) => ({
    page_ID__Set: (id) => {
        dispatch(page_ID__Set(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);