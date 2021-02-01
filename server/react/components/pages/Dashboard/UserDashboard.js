import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import server_user_get_personal_doc from
    '../../../functions/user/server_user_get_personal_doc';

export function UserDashboard(props) {

    const [loaded, set_loaded] = useState(false);

    // Account data
    const [availableStreams, set_available_streams] = useState([]);
    const [connectedBusinesses, set_connected_businesses] = useState([]);

    // Controls
    const [addingBusiness, set_adding_business] = useState(false);

    // Connect to business form data
    const [connectToBusinessForm, set_connect_to_business_form] = useState(false);
    const [businessPassword, set_business_password] = useState('');

    useEffect(() => {
        get_data();
    }, []);

    /** Fetches Account data from server to populate state */
    const get_data = () => {

        // Get data
        server_user_get_personal_doc()

        .then((personalData) => {
            console.log('userdashboard cb', personalData);
        })

        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="UserDashboard">
            
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