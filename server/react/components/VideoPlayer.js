import React, {useEffect, useState} from 'react';
import {ReactFlvPlayer} from 'react-flv-player';
import ReactHlsPlayer from 'react-hls-player';

export function VideoPlayer(props) {

    const [httpVideoHeight, set_http_video_height] = useState('100%');
    const [httpVideoWidth, set_http_video_width] = useState('100%');
    const [httpVideoError, set_http_video_error] = useState(false);

    const [httpsVideoHeight, set_https_video_height] = useState('100%');
    const [httpsVideoWidth, set_https_video_width] = useState('100%');
    const [httpsVideoError, set_https_video_error] = useState(false);

    const [errorState, set_error_state] = useState(0);

    useEffect(() => {
        document.querySelector('video').playsInline = "true";
    })

    /** Handle video errors */
    const handle_video_error = () => {
        console.log('Video error');
        set_error_state(errorState + 1);
    }

    return (
        <div className="VideoPlayer">

            <ReactFlvPlayer 
                url={props.links.https}
                height={httpsVideoHeight}
                width={httpsVideoWidth}
                isLive={true}
                handleError={(err) => handle_video_error()}
            />

            <ReactHlsPlayer 
                url={props.links.rtmp} 
                height="100%"
                width="100%"
                autoplay="true"
            />

            {/* If nothing works */}
            {(errorState > 2 || errorState < 0) &&
                <p>Something went wrong.</p>
            }
        </div>
    );
}

export default VideoPlayer;


