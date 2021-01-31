import React from 'react';

export function LoadingStreamInfoCard(props) {
    return (
        <div className="StreamInfoCard" data-type="loading">
            <LoadingSpinner />
        </div>
    )
};


export default LoadingStreamInfoCard;