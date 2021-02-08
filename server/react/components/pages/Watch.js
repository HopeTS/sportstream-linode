import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import {page_ID__Set} from '../../redux/actions/page';
import get_stream_link from '../../functions/stream/get_stream_link';
import get_hls_stream from '../../functions/stream/get_hls_stream';
import LoadingSpinner from '../LoadingSpinner';
import VideoPlayer from '../VideoPlayer';
import HLSStreamPlayer from '../HLSStreamPlayer';


/** Watch page (/watch) */
export function Watch(props) {

    const [streamActive, set_stream_active] = useState(false);
    const [streamLinks, set_stream_links] = useState(null);
    const [hlsStream, set_hls_stream] = useState(null);

    // Initial setup
    useEffect(() => {
        props.page_ID__Set('watch');
        generate_stream_link();
    }, []);

    /** Get stream link handler */
    const generate_stream_link = () => {
        
        // Get stream link
        const streamKey = window.location.pathname.split('/')[2];
        console.log('Here is streamKey', streamKey)
        set_stream_links(get_stream_link(streamKey));
        set_hls_stream(streamKey)
        return;
    }

    return (
        <div id="Watch">

            {streamLinks ?
                <VideoPlayer links={streamLinks} hls={hlsStream} />
            :
                <LoadingSpinner />
            }
        </div>
    )
}


/* Connect to store */
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


export default connect(mapStateToProps, mapDispatchToProps)(Watch);