import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import server_user_get_personal_doc from
    '../../../functions/user/server_user_get_personal_doc';
import get_stream_link from '../../../functions/stream/get_stream_link';

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
        console.log('here are user available streams', availableStreams);
    })

    useEffect(() => {
        get_data();
    }, []);

    /** Fetches Account data from server to populate state */
    const get_data = () => {

        // Get data
        server_user_get_personal_doc()

        // Populate state
        .then((personalData) => {
            if (!personalData) throw new Error("Couldn't retrieve User data");
            set_connected_businesses(personalData.connected_businesses);
            return 'hi'
        })
        .then((res) => {
            console.log('second link in userDashboard promise chain', res)
        })

        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="UserDashboard">
            <h1>Welcome, {props.account.name}</h1>

            <div className="UserDashboard__content">
                <h2>My Sports Centers</h2>

                {connectedBusinesses.map((business) => (
                    <article 
                        className="UserDashboard__contentSection"
                        key={business.name}
                    >
                        <h3>{business.name}</h3>

                        {business.streams.map((stream) => (
                            <a 
                                href={`/watch/${stream.key}`}
                                key={stream.key}
                                className="UserDashboard__contentRow"
                            >
                                Stream!
                            </a>
                        ))

                        }
                    </article>
                ))}

                <article className="UserDashboard__contentSection">
                    <h3>Available Streams</h3>

                    <article className="UserDashboard__contentBlock small">
                        {console.log('availableStreams', availableStreams)}
                        {availableStreams.map((stream) => (
                            <a 
                                href={`/watch/${stream.key}`}
                                className="UserDashboard__contentRow"
                            >
                                {stream.field}
                            </a>
                        ))}
                    </article>
                </article>
            </div>
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