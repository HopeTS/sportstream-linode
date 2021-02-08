import React, {useEffect, useState} from 'react';

export function RTMPStreamPlayer(props) {


    useEffect(() => {
        document.querySelector('video').playsInline = "true";
    })

    return (
        <div className="VideoPlayer">

            <video src={`http://${window.location.hostname}/stream/rtmp/${props.rtmp}`}></video>
        </div>
    );
}

export default RTMPStreamPlayer;