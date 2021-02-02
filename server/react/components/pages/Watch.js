import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import {page_ID__Set} from '../../redux/actions/page';


/** Watch page (/watch) */
export class Watch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            streamActive: false
        };
    };

    componentWillMount() {
        this.props.page_ID__Set('Watch');
        this.render_stream();
    };

    /** 
     * Get link to stream download
     * 
     * @returns {String | false} Link to stream if exists, else false
     */
    get_stream() {
        console.log(window.location.pathname);
        return window.location.pathname;
    }

    render_stream() {
        if (!flvjs.isSupported()) return console.error('flvjs is not supported');
        
        // Get link to stream
        const streamLink = this.get_stream();
        if (!streamLink) return console.error('');

        // Create flvPlayer
        const videoTag = document.getElementById('videoTag');
        const flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: streamLink
        });
        flvPlayer.attachMediaElement(videoTag);

        // Start stream
        flvPlayer.load();
        flvPlayer.play();
    }

    render() {
        return (
            <div id="Watch">
                <video className="Watch__video" id="videoTag"></video>
            </div>
        );
    };
};


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