import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {page_ID__Set} from '../../../redux/actions/page';
import BusinessDashboard from './BusinessDashboard';
import UserDashboard from './UserDashboard';
import LoadingSpinner from '../../LoadingSpinner';

export function Dashboard(props) {
    return (
        <div className="Dashboard">
            {/* Add section for account information */}
            <LoadingSpinner/>
            {props.account.type === 'user' ?
                <UserDashboard />
                :
                <BusinessDashboard />
            }
        </div>
    );
}


/* Connect to store */
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    };
};

const mapDispatchToProps = (dispatch) => ({
    page_ID__Set: (id) => {
        dispatch(page_ID__Set(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);