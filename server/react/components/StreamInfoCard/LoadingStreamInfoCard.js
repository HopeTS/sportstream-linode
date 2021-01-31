import React from 'react';
import React from 'react';

import LoadingSpinner from '../LoadingSpinner';

export function LoadingStreamInfoCard(props) {
    return (
        <div className="StreamInfoCard" data-type="loading">
            <LoadingSpinner />
        </div>
    )
};


export default LoadingStreamInfoCard;