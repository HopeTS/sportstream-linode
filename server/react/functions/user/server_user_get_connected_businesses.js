import axios from 'axios';

export default () => {
    
    // Get raw data
    axios.get(
        '/user/get-connected-businesses', {withCredentials: true}
    )

    // Clean data
    .then((res) => {
        return res.data;
    })

    .catch((err) => {
        console.log(err);
        return false;
    })
}