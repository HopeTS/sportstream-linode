import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import LoadingSpinner from '../../LoadingSpinner';
import server_user_get_personal_doc from
    '../../../functions/user/server_user_get_personal_doc';
import server_user_connect_business from
    '../../../functions/user/server_user_connect_business';

export function UserDashboard(props) {

    const [loaded, set_loaded] = useState(false);

    const [connectedBusinesses, set_connected_businesses] = useState([]);

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
            set_loaded(true);
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
                console.log('connect business component function res false')
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
            {loaded ?
                <div className="UserDashboard__content">
                    {connectedBusinesses.length > 0 &&
                        <h2>My Sports Centers</h2>
                    }

                    {connectedBusinesses.length > 0 &&
                        <div className="UserDashboard__contentSection">
                            <h3>Available Streams</h3>

                            {connectedBusinesses.map((business) => (
                                <article 
                                    className="UserDashboard__contentBlock small"
                                    key={business.name}
                                >
                                    <h4>{business.name}</h4>
                                    {business.streams.map((stream) => (
                                        <a 
                                            className="UserDashboard__contentRow"
                                            href={`/watch/${stream.key}`}
                                            key={stream.key}
                                        >
                                            <div>
                                                <h4>{stream.field}</h4>
                                            </div>
                                        </a>
                                    ))}
                                </article>
                            ))}
                        </div>
                    }

                    <div className="UserDashboard__contentSection">
                        <div 
                            className="UserDashboard__contentBlock small clear"
                        >
                            <div className="UserDashboard__form small">
                                <label htmlFor="businessKey">
                                    Business Key:
                                </label>

                                <input
                                    type="text"
                                    id="businessKey"
                                    onChange={(e) => {
                                        set_business_key(e.target.value)}
                                    }
                                />

                                <button
                                    onClick={handle_connect_business}
                                >
                                    Connect
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="UserDashboard__content">
                    <div className="UserDashboard__contentSection">
                        <LoadingSpinner />
                    </div>
                </div>
            }
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