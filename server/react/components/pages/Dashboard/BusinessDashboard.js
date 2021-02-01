import React, {cloneElement, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import server_business_get_personal_doc from 
    '../../../functions/business/server_business_get_personal_doc';
import server_business_create_stream from 
    '../../../functions/business/server_business_create_stream';
import server_business_generate_connection_id from 
    '../../../functions/business/server_business_generate_connection_id';
import StreamInfoCard from '../../StreamInfoCard/StreamInfoCard';

export function BusinessDashboard(props) {

    const [loaded, set_loaded] = useState(false);
    const [networkError, set_network_error] = useState(false);
    
    // Account data
    const [upcomingStreams, set_upcoming_streams] = useState([]);
    const [currentStreams, set_current_streams] = useState([]);
    const [previousStreams, set_previous_streams] = useState([])
    const [connectionIds, set_connection_ids] = useState([]);
    const [connectedUsers, set_connected_users] = useState([]);

    // Controls
    const [addingStream, set_adding_stream] = useState(false);

    // Create stream form data
    const [createStreamForm, set_create_stream_form] = useState(false);
    const [fieldName, set_field_name] = useState('');

    useEffect(() => {
        console.log('new connection ids', connectionIds);
        console.log('new streams', upcomingStreams);
    })
    

    useEffect(() => {
        get_data();
    }, []);

    /** Fetches Account data from server to populate state */
    const get_data = () => {
        // Get data
        server_business_get_personal_doc()

        .then((personalData) => {
            console.log('Here is personalData', personalData)
            console.log('personalData previous streams', personalData.streams.previous)

            // Populate state
            set_upcoming_streams(personalData.streams.upcoming);
            set_current_streams(personalData.streams.current);
            set_previous_streams(personalData.streams.previous);
            set_connection_ids(personalData.connection_ids);
            set_connected_users(personalData.connected_users);

            set_loaded(true);
            return;
        })

        .catch((err) => {
            set_network_error(true);
            set_loaded(true);
            return;
        })
    }

    /** Handler for generate_connection_id */
    const handle_generate_connection_id = () => {
        
        // Server endpoint
        const theseIds = server_business_generate_connection_id()
        
        // Add to state
        .then((connectionId) => {
            console.log('generate_connection_id cb dashboard', connectionId);
            let newIds;
            connectionIds.forEach((id) => {
                newIds.push(id);
            });
            newIds.push(connectionId);
            console.log('here is newIds', newIds)
            set_connection_ids(newIds);
            return newIds;
        })

        .catch((err) => {
            set_network_error(true);
            return false;
        });

        console.log('theseIds', theseIds)
    }

    /** Handler for set_create_stream_form */
    const handle_set_create_stream_form = () => {
        set_create_stream_form(!createStreamForm);
    }

    /** Handler for set_field_name */
    const handle_set_field_name = (name) => {
        set_field_name(name);
    }

    /** Handles creating a stream */
    const handle_create_stream = () => {

        // Server endpoint
        server_business_create_stream({field: fieldName})

        // Add to state
        .then((stream) => {
            let newStreams;
            upcomingStreams.forEach((oldStream) => {
                newStreams.push(oldStream);
            });

            newStreams.push(stream);
            console.log('newStreams', newStreams);
            set_upcoming_streams(newStreams)
            return true;
        })

        .catch((err) => {
            return false;
        })

    }

    return (
        <div className="BusinessDashboard">

            <div className="BusinessDashboard__content">
                <h2>My Streams</h2>

                <article 
                    className="BusinessDashboard__contentInteractive"
                >
                    <button 
                        onClick={handle_set_create_stream_form}
                        data-active={!createStreamForm}
                    >
                        Add new stream
                    </button>
                </article>

                <div 
                    className="BusinessDashboard__form"
                    data-active={createStreamForm}
                >
                    <div>
                        <label htmlFor="field">Field:</label>
                        <input 
                            type="text" 
                            id="field"
                            onChange={(e) => {set_field_name(e.target.value)}}
                        />
                    </div>

                    <button onClick={handle_create_stream}>
                        Create
                    </button>
                </div>

                <article className="BusinessDashboard__contentSection">
                    <h3>Upcoming Streams</h3>
                    
                    {loaded ?
                        <article className="BusinessDashboard__contentBlock">
                            {upcomingStreams.map((stream) => (
                                <section 
                                    className="BusinessDashboard__contentRow"
                                    key={stream.key}
                                >
                                    <div>
                                        <h4>Field:</h4>
                                        <p>{stream.field}</p>
                                    </div>

                                    <div>
                                        <h4>Key:</h4>
                                        <p>{stream.key}</p>
                                    </div>
                                </section>
                            ))}
                        </article>
                        :
                        <article className="BusinessDashboard__contentBlock">
                            <StreamInfoCard />
                        </article>
                    }
                </article>
                
                <article className="BusinessDashboard__contentSection">
                    <h3>Current Streams</h3>

                    {loaded ?
                        <article className="BusinessDashboard__contentBlock">
                            {currentStreams.map((stream) => (
                                <section 
                                    className="BusinessDashboard__contentRow"
                                    key={stream.key}
                                >
                                    <div>
                                        <h4>Field:</h4>
                                        <p>{stream.field}</p>
                                    </div>

                                    <div>
                                        <h4>Key:</h4>
                                        <p>{stream.key}</p>
                                    </div>
                                </section>
                            ))}
                        </article>
                        :
                        <article className="BusinessDashboard__contentBlock">
                            <StreamInfoCard />
                        </article>
                    }
                </article>

                <article className="BusinessDashboard__contentSection">
                    <h3>Previous Streams</h3>
                    
                    {loaded ?
                        <article className="BusinessDashboard__contentBlock">
                            {previousStreams.map((stream) => (
                                <section 
                                    className="BusinessDashboard__contentRow"
                                    key={stream.key}
                                >
                                    <div>
                                        <h4>Field:</h4>
                                        <p>{stream.field}</p>
                                    </div>

                                    <div>
                                        <h4>Key:</h4>
                                        <p>{stream.key}</p>
                                    </div>
                                </section>
                            ))}
                        </article>
                        :
                        <article className="BusinessDashboard__contentBlock">
                            <StreamInfoCard />
                        </article>
                    }
                </article>
            </div>

            <div className="BusinessDashboard__content">
                <h2>My Members</h2>

                <article
                    className="BusinessDashboard__contentInteractive"
                >
                    <button
                        onClick={handle_generate_connection_id}
                    >
                        Create new connection password
                    </button>
                </article>

                <article className="BusinessDashboard__contentSec">
                    <h3>Available Connection IDs</h3>

                    {loaded ?
                        <article className="BusinessDashboard__contentBlock">
                            {connectionIds.map((connectionId) => (
                                <section 
                                    className="BusinessDashboard__contentRow"
                                    key={connectionId}
                                >
                                    <div>
                                        <h4>ID:</h4>
                                        <p>{connectionId}</p>
                                    </div>
                                </section>
                            ))}
                        </article>
                        :
                        <article className="BusinessDashboard__contentBlock">
                            <StreamInfoCard />
                        </article>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessDashboard);