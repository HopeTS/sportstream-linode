import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {page_ID__Set} from '../redux/actions/page';
//import Stream from '../../functions/endpoint/stream/Stream';
import LoadingSpinner from '../components/LoadingSpinner';
import VideoPlayer from '../components/VideoPlayer';


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


/** Watch page */
const Watch = connect(
    mapStateToProps, mapDispatchToProps
)(function(props: any) {

    //const stream = new Stream;

    //const [streamActive, set_stream_active] = useState(false);
    const [streamLinks, set_stream_links] = useState<boolean | null>(null);
    const [streamKey, set_stream_key] = useState('');


    useEffect(() => {
        props.page_ID__Set('watch');
        generate_stream_link();
        set_stream_key(window.location.pathname.split('/')[2]);
    }, []);


    /** Get stream link handler */
    const generate_stream_link = () => {
        // TODO
        set_stream_links(true);
        return;
    }

    
    return (
        <div id="Watch">

            {streamLinks ?
                <VideoPlayer streamKey={streamKey} />
            :
                <LoadingSpinner />
            }
        </div>
    )
});


export = Watch;