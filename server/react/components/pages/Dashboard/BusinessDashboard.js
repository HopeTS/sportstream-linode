import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import server_business_get_personal_doc from 
    '../../../functions/business/server_business_get_personal_doc';
import StreamInfoCard from '../../StreamInfoCard';

export function BusinessDashboard(props) {

    const [loaded, setLoaded] = useState(false);
    
    // Account data
    const [upcomingStreams, set_upcoming_streams] = useState([]);
    const [currentStreams, set_current_streams] = useState([]);
    const [previousStreams, set_previous_streams] = useState([]);
    const [connectionIds, set_connection_ids] = useState([]);
    const [connectedUsers, set_connected_users] = useState([]);

    // Controls
    const [addingStream, set_adding_stream] = useState(false);
    

    useEffect(() => {
        get_data();
    });

    /**
     * Fetches Account data from server to populate state
     */
    const get_data = () => {
        const personalData = server_business_get_personal_doc()
        return;
    }

    /**
     * Generates a new upcoming stream
     */
    const add_stream = () => {
        // TODO

    }

    return (
        <div className="BusinessDashboard">
            <h2>Streams</h2>
            <article className="BusinessDashboard__streams">
                <section className="BusinessDashboard__controls">
                    <button></button>
                </section>
                
                <section>
                    <h3>Current Streams</h3>
                    {currentStreams.map((stream) => (
                        <StreamInfoCard {...stream} />
                    ))}
                </section>
    
                <section>
                    <h3>Upcoming Streams</h3>
                    {upcomingStreams.map((stream) => (
                        <StreamInfoCard {...stream}/>
                    ))}
                </section>

                <section>
                    <h3>Previous Streams</h3>
                    {previousStreams.map((stream) => (
                        <StreamInfoCard {...stream} />
                    ))}
                </section>
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