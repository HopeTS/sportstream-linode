import React, {cloneElement, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import server_business_get_personal_doc from 
    '../../../functions/business/server_business_get_personal_doc';
import server_business_create_stream from 
    '../../../functions/business/server_business_create_stream';
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

    /** Handler for set_create_stream_form */
    const handle_set_create_stream_form = () => {
        set_create_stream_form(!createStreamForm)
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
            console.log('Stream in BusinessDashboard cb', stream);
            return true;
        })

        .catch((err) => {
            return false;
        })

    }

    return (
        <div className="BusinessDashboard">
            <h2>Streams</h2>
            <article className="BusinessDashboard__streamsSection">
                <section className="BusinessDashboard__controls">
                    <button 
                        className="BusinessDashboard__control"
                        onClick={handle_set_create_stream_form}
                        data-active={!createStreamForm}
                    >
                        Add new stream
                    </button>
                </section>

                <section
                    className="BusinessDashboard__form"
                    data-active={createStreamForm}
                >
                    <div className="BusinessDashboard__formField">
                        <label htmlFor="field">Field</label>
                        <input 
                            type="text"
                            id="field"
                            name="field"
                            onChange={(e) => handle_set_field_name(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="BusinessDashboard__formSubmit"
                        onClick={handle_create_stream}
                        data-active={!fieldName}
                        disabled={!fieldName}
                    >
                        Submit
                    </button>
                </section>

                {loaded ?
                    <section className="BusinessDashboard__streamsList">
                        <h2>Upcoming Streams</h2>
                        <div className="BusinessDashboard__streams">
                            {upcomingStreams.map((stream) => (
                                <StreamInfoCard 
                                    type='business'
                                    field={stream.field}
                                    streamKey={stream.key}
                                    status={stream.status}
                                    key={stream.key}
                                />
                            ))}
                        </div>
                    </section>
                    :
                    <section className="BusinessDashboard__loading">
                        <div className="BusinessDashboard__streams">
                            <StreamInfoCard />
                            <StreamInfoCard />
                        </div>
                    </section>
                }

                {loaded ?
                    <section className="BusinessDashboard__streamsList">
                        <h2>Current Streams</h2>
                        <div className="BusinessDashboard__streams">
                            {currentStreams.map((stream) => (
                                <StreamInfoCard 
                                    type="business"
                                    field={stream.field}
                                    streamKey={stream.key}
                                    status={stream.status}
                                    key={stream.key}
                                />
                            ))}
                        </div>
                    </section>
                    :
                    <section className="BusinessDashboard__loading">
                        <div className="BusinessDashboard__streams">
                            <StreamInfoCard />
                            <StreamInfoCard />
                        </div>
                    </section>
                }

                {loaded ?
                    <section className="BusinessDashboard__streamsList">
                        <h2>Previous Streams</h2>
                        <div className="BusinessDashboard__streams">
                            {previousStreams.map((stream) => (
                                <StreamInfoCard 
                                    type="business"
                                    field={stream.field}
                                    streamKey={stream.key}
                                    status={stream.status}
                                    key={stream.key}
                                />
                            ))}
                        </div>
                    </section>
                    :
                    <section className="BusinessDashboard__loading">
                        <div className="BusinessDashboard__streams">
                            <StreamInfoCard />
                            <StreamInfoCard />
                        </div>
                    </section>
                }
            </article>

            <article className="BusinessDashboard__connections">
                <section className="BusinessDashboard__controls">

                </section>

                <section>
                    <h3>Connection IDs</h3>
                </section>
            </article>
            {/*

                Requirements:
                    Stream logs
                    Create new stream
                    Delete stream
                    View current stream

                    View available connection IDs
                    Create new connection ID
                    Delete connection ID

                    View connected users
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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessDashboard);