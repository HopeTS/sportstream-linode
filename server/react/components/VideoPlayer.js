import React, {useEffect, useState} from 'react';
import {ReactFlvPlayer} from 'react-flv-player';

export function VideoPlayer(props) {

    const [videoHeight, set_video_height] = useState('800px');
    const [videoWidth, set_video_width] = useState('800px');

    return (
        <div className="VideoPlayer">
            <ReactFlvPlayer 
                url={props.link}
                height={videoHeight}
                width={videoWidth}
                isLive={true}
            />
        </div>
    );
}

export default VideoPlayer;