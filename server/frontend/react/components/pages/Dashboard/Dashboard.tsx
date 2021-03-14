import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {page_ID__Set} from '../../../redux/actions/page';
import BusinessDashboard from './BusinessDashboard';
import UserDashboard from './UserDashboard';


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


    useEffect(() => {
        console.log(props.account);
    }, []);


    return (
        <div className="Dashboard">
            {props.account.type}
            {props.account.type === 'user' ?
                <UserDashboard />
                :
                <BusinessDashboard />
            }
        </div>
    );
});


export = Dashboard;