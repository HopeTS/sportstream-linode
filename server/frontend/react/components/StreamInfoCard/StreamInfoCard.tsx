import React from 'react';

import BusinessStreamInfoCard from './BusinessStreamInfoCard';
import LoadingStreamInfoCard from './LoadingStreamInfoCard';
import UserStreamInfoCard from './UserStreamInfoCard';


/** Root Stream info card component */
function StreamInfoCard(props) {
    switch(props.type) {
        case 'business':
            return <BusinessStreamInfoCard {...props} />

        case 'user':
            return <UserStreamInfoCard {...props} />

        default:
            return <LoadingStreamInfoCard />
    }
}


export = StreamInfoCard;