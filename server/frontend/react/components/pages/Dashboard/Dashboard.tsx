import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {page_ID__Set} from '../../../redux/actions/page';
import BusinessDashboard from './BusinessDashboard';
import UserDashboard from './UserDashboard';
import LoadingSpinner from '../../LoadingSpinner';


// Store config
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


/** Root dashboard component */
const Dashboard = connect(
    mapStateToProps, mapDispatchToProps
)(function(props: any) {

    return (
        <div className="Dashboard">
            {props.account.type === 'user' ?
                <UserDashboard />
                :
                <BusinessDashboard />
            }
        </div>
    );
});


export = Dashboard;