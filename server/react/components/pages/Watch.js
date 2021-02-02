import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import {page_ID__Set} from '../../redux/actions/page';
import get_stream_link from '../../functions/stream/get_stream_link';
import LoadingSpinner from '../LoadingSpinner';
import Reflv from '../Reflv';


/** Watch page (/watch) */
export class Watch extends React.Component {
    constructor(props) {
        this.state = {
            streamLink: null
        }    
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        if (this.flvPlayer) {

        }
    }

    render() {
        return (
            <div id="Watch">
                {streamLink ?
                    <Reflv 
                        url={streamLink}
                        type="flv"
                        isLive
                        cors
                        config={{
                            enableWorker: true,
                            enableStashBuffer: false,
                            stashInitialSize: 128
                        }}
                    />
                :
                    <LoadingSpinner />
                }
            </div>
        )
    }
}

export function WatchOld(props) {

    const [streamActive, set_stream_active] = useState(false);
    const [streamLink, set_stream_link] = useState(null);

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
        set_stream_link(get_stream_link(streamKey));
        return;
    }

    return (
        <div id="Watch">
            {streamLink ?
            <video 
                className="Watch__video" id="videoTag"
                typ="rtmp/mp4"
            >
                <source src={streamLink} />
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