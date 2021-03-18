import React, {useEffect, useState} from 'react';
import {ReactFlvPlayer} from 'react-flv-player';
import axios from 'axios';


/** Video player component */
function VideoPlayer(props) {

    const [httpVideoError, set_http_video_error] = useState<boolean>(false);


    useEffect(() => {
        console.log('Component mounted')

        axios.get(`https://${window.location.hostname}:8443/live/${props.streamKey}.flv`)

        .then((res) => {
            console.log('There was a valid response')
            console.log(res)
        })

        .catch((err) => {
            console.log('There was an error')
            console.log(err);
        })
    }, [])


    useEffect(() => {
        console.log('Here is streamKey', props.streamKey);
    })


    /** Handle HTTP video error */
    const handle_http_video_error = (err: any) => {
        console.log(err);
        set_http_video_error(true);
        return;
    }


    return (
        <div className="VideoPlayer">

            {/* Default HTTP player */}
            <ReactFlvPlayer 
                url={`https://${window.location.hostname}:8443/live/${props.streamKey}.flv`}
                height='100%'
                width='100%'
                isLive={true}
                handleError={(err) => handle_http_video_error(err)}
                hasAudio={false}
                isMuted={true}
            />

            {/* If nothing works */}
            {(httpVideoError) &&
                <p>Something went wrong.</p>
            }
        </div>
    );
}


export = VideoPlayer;