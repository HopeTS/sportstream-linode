import React, {useEffect, useState} from 'react';
import {ReactFlvPlayer} from 'react-flv-player';
import ReactHlsPlayer from 'react-hls-player';
import HLSPlayer from 'react-hls';

export function VideoPlayer(props) {

    const [httpVideoHeight, set_http_video_height] = useState('100%');
    const [httpVideoWidth, set_http_video_width] = useState('100%');
    const [httpVideoError, set_http_video_error] = useState(false);

    const [httpsVideoHeight, set_https_video_height] = useState('100%');
    const [httpsVideoWidth, set_https_video_width] = useState('100%');
    const [httpsVideoError, set_https_video_error] = useState(false);


    useEffect(() => {
        document.querySelector('video').playsInline = "true";
    })

    /** Handle HTTP video error */
    const handle_http_video_error = () => {
        set_http_video_error(true);
    }

    /** Handle HTTPS video error */
    const handle_https_video_error = () => {
        set_https_video_error(true);
    }

    return (
        <div className="VideoPlayer">

            <ReactHlsPlayer 
                url={`http://${window.location.host}/stream/hls/${props.hls}`}
                autoplay={true}
                controls={true}
                width="100%"
                height="100%"
            />

            sep



            {/* Default HTTP player */}
            {!httpVideoError &&
                <ReactFlvPlayer 
                    url={props.links.http}
                    height={httpVideoHeight}
                    width={httpVideoWidth}
                    isLive={true}
                    handleError={(err) => handle_http_video_error()}
                />
            }

            {/* Fallback HTTPS player */}
            {(httpVideoError && !httpsVideoError) &&
                <ReactFlvPlayer 
                    url={props.links.https}
                    height={httpsVideoHeight}
                    width={httpsVideoWidth}
                    isLive={true}
                    handleError={(err) => handle_https_video_error()}
                />
            }

            {/* If nothing works */}
            {(httpVideoError && httpsVideoError) &&
                <p>Something went wrong.</p>
            }
        </div>
    );
}

export default VideoPlayer;