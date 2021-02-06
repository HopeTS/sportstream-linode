import React, {useEffect, useState} from 'react';
import {ReactFlvPlayer} from 'react-flv-player';

export function VideoPlayer(props) {

    const [httpVideoHeight, set_http_video_height] = useState('100%');
    const [httpVideoWidth, set_http_video_width] = useState('100%');
    const [httpVideoError, set_http_video_error] = useState(false);

    const [httpsVideoHeight, set_https_video_height] = useState('100%');
    const [httpsVideoWidth, set_https_video_width] = useState('100%');
    const [httpsVideoError, set_https_video_error] = useState(false);

    /** Handle HTTP video error */
    const handle_http_video_error = () => {
        set_http_video_error(true);
    }

    /** Handle HTTPS video error */
    const handle_https_video_error = () => {
        set_https_video_error(true);
    }

    useEffect(() => {
        console.log('what does this say nick', props.links)
    }, [])

    return (
        <div className="VideoPlayer">

            <ReactFlvPlayer
                url={props.links.https}
                height={httpsVideoHeight}
                width={httpsVideoWidth}
                isLive={true}
            />
        </div>
    );
}

export default VideoPlayer;