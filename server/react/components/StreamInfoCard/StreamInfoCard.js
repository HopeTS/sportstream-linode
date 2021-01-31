import BusinessStreamInfoCard from './BusinessStreamInfoCard';
import LoadingStreamInfoCard from './LoadingStreamInfoCard';
import UserStreamInfoCard from './UserStreamInfoCard';

export function StreamInfoCard(props) {
    switch(props.type) {
        case 'business':
            return <BusinessStreamInfoCard {...props} />

        case 'user':
            return <UserStreamInfoCard {...props} />

        default:
            return <LoadingStreamInfoCard />
    }
}

export default StreamInfoCard;