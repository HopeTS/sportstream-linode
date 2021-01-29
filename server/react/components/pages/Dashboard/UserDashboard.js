import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

export function UserDashboard() {
    return (
        <div className="UserDashboard">
            {/*
                Requirements
                    View connected Businesses
                    View all currently available streams
            */}
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