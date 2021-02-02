import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import {page_ID__Set} from '../../redux/actions/page';
import LoadingSpinner from '../LoadingSpinner';


/** Watch page (/watch) */
export function Watch(props) {

    const [streamActive, set_stream_active] = useState(false);
    const [streamLink, set_stream_link] = useState(null);

    // Initial setup
    useEffect(() => {
        props.page_ID__Set('watch');
        get_stream_link();
    }, []);

    /** Get stream link */
    const get_stream_link = () => {
        
        // Get stream link
        const pathname = window.location.pathname;
        console.log(pathname);
        return;
    }

    return (
        <div id="Watch">
            {streamLink ?
            <video 
                className="Watch__video" id="videoTag"
                typ="rtmp/mp4"
            >
                <source src={streamLink}/>
                Your browser does not support this video format.
            </video>
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