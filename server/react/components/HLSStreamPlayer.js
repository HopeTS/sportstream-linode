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
        </div>
    );
}

export default VideoPlayer;