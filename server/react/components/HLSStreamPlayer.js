import React, {useEffect, useState} from 'react';
import {ReactFlvPlayer} from 'react-flv-player';
import {ReactHlsPlayer} from 'react-hls-player';

export function VideoPlayer(props) {


    useEffect(() => {
        document.querySelector('video').playsInline = "true";
    })

    return (
        <div className="VideoPlayer">

            <ReactHlsPlayer 
                url={`http://${window.location.hostname}/stream/hls/${props.hls}`}
                autoplay={true}
                controls={true}
                width="100%"
                height="100%"
            />

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