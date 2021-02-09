import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import {page_ID__Set} from '../../redux/actions/page';
import get_stream_link from '../../functions/stream/get_stream_link';
import LoadingSpinner from '../LoadingSpinner';
import VideoPlayer from '../VideoPlayer';


/** Watch page (/watch) */
export function Watch(props) {

    const [streamActive, set_stream_active] = useState(false);
    const [streamLinks, set_stream_links] = useState(null);
    const [streamKey, set_stream_key] = useState('');

    // Initial setup
    useEffect(() => {
        props.page_ID__Set('watch');
        generate_stream_link();
        set_stream_key(window.location.pathname.split('/')[2])
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
                <VideoPlayer streamKey={props.streamKey} />
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