import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import server_user_get_personal_doc from
    '../../../functions/user/server_user_get_personal_doc';
import server_user_connect_business from
    '../../../functions/user/server_user_connect_business';

export function UserDashboard(props) {

    const [loaded, set_loaded] = useState(false);

    const [connectedBusinesses, set_connected_businesses] = useState([]);

    // Controls
    const [addingBusiness, set_adding_business] = useState(false);

    // Connect business form data
    const [connectBusinessForm, set_connect_business_form] = useState(false);
    const [businessKey, set_business_key] = useState('');

    useEffect(() => {
        get_data();
    }, []);

    useEffect(() => {
        console.log('Connected businesses length', connectedBusinesses);
    })

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

    const handle_connect_business_form = () => {
        set_connect_business_form(!connectBusinessForm);
    }

    const handle_connect_business = () => {
        server_user_connect_business(businessKey)

        .then((res) => {
            if (res) {
                get_data();
            }

            else {
                return false;
            }
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
                                {stream.field} 1
                            </a>
                        ))

                        }
                    </article>
                ))}

                {connectedBusinesses.length > 0 ?
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
                    :
                    <article className="UserDashboard__contentSection">
                        <h3>No connected businesses</h3>
                    </article>
                }

                <article className="UserDashboard__contentInteractive">
                    <button
                        onClick={handle_connect_business_form}
                        data-active={!connectBusinessForm}
                    >
                        Connect to Business
                    </button>
                </article>

                <div className="UserDashboard__form">
                    <label htmlFor="businessKey">Business Key:</label>
                    <input
                        type="text"
                        id="businessKey"
                        onChange={(e) => {set_business_key(e.target.value)}}
                    />

                    <button
                        onClick={handle_connect_business}
                    >
                        Connect
                    </button>
                </div>
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