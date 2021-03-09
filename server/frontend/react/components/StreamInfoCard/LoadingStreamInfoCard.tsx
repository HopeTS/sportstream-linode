import React from 'react';

import LoadingSpinner from '../LoadingSpinner';


/** Loading stream info card */
function LoadingStreamInfoCard(props) {
    return (
        <div className="StreamInfoCard" data-type="loading">
            <LoadingSpinner />
        </div>
    )
};


export = LoadingStreamInfoCard;