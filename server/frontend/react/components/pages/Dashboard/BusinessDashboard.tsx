import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import StreamInfoCard from '../../StreamInfoCard/StreamInfoCard';
import Endpoint from '../../../functions/endpoint/Endpoint';


// Redux store config
const mapStateToProps = (state) => {
    return {
        account: state.auth.account
    };
};


/** Business Dashboard component */
const BusinessDashboard = connect(
    mapStateToProps, undefined
)(function(props: any) {

    const [loaded, set_loaded] = useState(false);
    const [networkError, set_network_error] = useState(false);

    // Account data
    const [upcomingStreams, set_upcoming_streams] = useState<any[]>([]);
    const [currentStreams, set_current_streams] = useState<any[]>([]);
    const [previousStreams, set_previous_streams] = useState<any[]>([])
    const [connectionPasswords, set_connection_passwords] = useState<string[]>([]);
    const [connectedUsers, set_connected_users] = useState<any[]>([]);

    // Create stream form data
    const [createStreamForm, set_create_stream_form] = useState(false);
    const [fieldName, set_field_name] = useState('');

    const endpoint = new Endpoint;


    useEffect(() => {
        get_data();
    }, []);


    /** Fetches Account data from server to populate state */
    function get_data(): Promise<boolean> {

        // Get data
        const result = endpoint.business.get_personal_doc()

        .then((personalData: any) => {
            console.log('Here is personalData', personalData)
            console.log('personalData previous streams', personalData.streams.previous)

            // Populate state
            set_upcoming_streams(personalData.streams.upcoming);
            set_current_streams(personalData.streams.current);
            set_previous_streams(personalData.streams.previous);
            set_connection_passwords(personalData.connection_passwords);
            set_connected_users(personalData.connected_users);

            console.log(connectedUsers);
            set_loaded(true);
            return true;
        })

        .catch((err: any) => {
            set_network_error(true);
            console.log(networkError);
            set_loaded(true);
            return false;
        });

        return result;
    }


    /** Handler for generate_connection_password */
    function handle_generate_connection_password(): Promise<boolean> {
        
        // Server endpoint
        const result = endpoint.business.generate_connection_password()
        
        // Add to state
        .then((connectionPassword: any) => {
            console.log('generate_connectionPassword cb dashboard', connectionPassword);
            const newPasswords = [...connectionPasswords];
            newPasswords.push(connectionPassword);
            console.log('here is newPasswords', newPasswords)
            set_connection_passwords(newPasswords);
            return newPasswords;
        })

        .catch((err) => {
            set_network_error(true);
            return false;
        });

        return result;
    }


    /** Handler for set_create_stream_form */
    function handle_set_create_stream_form(): void {
        set_create_stream_form(!createStreamForm);
        return;
    }


    /** Handler for set_field_name */
    function handle_set_field_name(name: string): void {
        set_field_name(name);
        return;
    }


    /** Handles creating a stream */
    function handle_create_stream(): Promise<boolean> {

        // Server endpoint
        const result = endpoint.business.create_stream({field: fieldName})

        // Add to state
        .then((stream) => {
            const newStreams = [...upcomingStreams];
            newStreams.push(stream);
            console.log('newStreams', newStreams);
            set_upcoming_streams(newStreams)
            return true;
        })

        .catch((err) => {
            return false;
        });

        return result;
    }
    

    return (
        <div className="BusinessDashboard">
            <h1>Welcome, {props.account.name}</h1>
            
            <div className="BusinessDashboard__content">
                <h2>My Streams</h2>

                <article 
                    className="BusinessDashboard__contentInteractive"
                >
                    <div 
                        className="BusinessDashboard__contentBlock small clear"
                    >
                        <button 
                            onClick={handle_set_create_stream_form}
                            data-active={!createStreamForm}
                        >
                            Add new stream
                        </button>
                    </div>
                </article>

                <div className="BusinessDashboard__contentSection">
                    <article 
                        className="BusinessDashboard__contentBlock small clear"
                    >
                        <div 
                            className="BusinessDashboard__form small"
                            data-active={createStreamForm}
                        >
                            <div>
                                <label htmlFor="field">Field:</label>
                                <input 
                                    type="text" 
                                    id="field"
                                    onChange={(e) => {handle_set_field_name(e.target.value)}}
                                />
                            </div>

                            <button onClick={handle_create_stream}>
                                Create
                            </button>
                        </div>
                    </article>
                </div>

                <article className="BusinessDashboard__contentSection">
                    <h3>Upcoming Streams</h3>
                    
                    {loaded ?
                        <article 
                            className="BusinessDashboard__contentBlock small"
                        >
                            {upcomingStreams.map((stream: any) => (
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
                        <article 
                            className="BusinessDashboard__contentBlock small"
                        >
                            {currentStreams.map((stream: any) => (
                                <a
                                    className="BusinessDashboard__contentRow"
                                    key={stream.key}
                                    href={`/watch/${stream.key}`}
                                >
                                    <div>
                                        <h4>Field:</h4>
                                        <p>{stream.field}</p>
                                    </div>

                                    <div>
                                        <h4>Key:</h4>
                                        <p>{stream.key}</p>
                                    </div>
                                </a>
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
                        <article 
                            className="BusinessDashboard__contentBlock small"
                        >
                            {previousStreams.map((stream: any) => (
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
                        onClick={handle_generate_connection_password}
                    >
                        Create new connection password
                    </button>
                </article>

                <article className="BusinessDashboard__contentSection">
                    <h3>Available Connection Passwords</h3>

                    {loaded ?
                        <article 
                            className="BusinessDashboard__contentBlock small"
                        >
                            {connectionPasswords.map((connectionPassword: string) => (
                                <section 
                                    className="BusinessDashboard__contentRow"
                                    key={connectionPassword}
                                >
                                    <div>
                                        <h4>ID:</h4>
                                        <p>{connectionPassword}</p>
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
});


export = BusinessDashboard;