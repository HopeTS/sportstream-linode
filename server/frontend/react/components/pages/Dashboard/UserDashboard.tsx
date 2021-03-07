import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import LoadingSpinner from '../../LoadingSpinner';
import Endpoint from '../../../functions/endpoint/Endpoint';


// Store config
const mapStateToProps = (state: any) => {
    return {
        account: state.auth.account
    };
};


/** User Dashboard component */
const UserDashboard = connect(
    mapStateToProps, undefined
)(function(props: any) {

    const endpoint = new Endpoint;

    const [loaded, set_loaded] = useState<boolean>(false);
    const [connectedBusinesses, set_connected_businesses] = useState<any[]>([]);

    // Connect business form data
    //const [connectBusinessForm, set_connect_business_form] = useState<boolean>(false);
    const [businessKey, set_business_key] = useState<string>('');


    useEffect(() => {
        get_data();
    }, []);


    useEffect(() => {
        console.log('Connected businesses length', connectedBusinesses);
    });


    /* Fetch Account data from server to populate state */
    function get_data(): Promise<boolean> {

        // Get data
        const response = endpoint.user.get_personal_doc()

        // Populate state
        .then((personalData: any) => {
            if (!personalData) throw new Error("Couldn't retrieve User data");
            set_connected_businesses(personalData.connected_businesses);
            set_loaded(true);
            return true;
        })

        .catch((err) => {
            console.log(err);
            return false;
        });

        return response;
    }


    /** Handler for connect_business_form */
    //function handle_connect_business_form(): void {
    //    set_connect_business_form(!connectBusinessForm);
    //    return;
    //}


    /** Handler for connect_business */
    function handle_connect_business(): Promise<boolean> {

        // Get data
        const response = endpoint.user.connect_business(businessKey)

        // Populate state
        .then((res: any) => {
            if (res) {
                get_data();
                return true;
            }

            else {
                console.log('connect business component function res false')
                return false;
            }
        })

        .catch((err) => {
            console.log(err);
        });

        return response;
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
});

export = UserDashboard;