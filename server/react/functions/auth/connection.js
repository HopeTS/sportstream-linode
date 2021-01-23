import axios from 'axios';

/**
 * Check client/server connection status
 */
export const check_connection = () => {
    
    // Ask server is user is authenticated
    axios.get('/ensure-login')

    .then((res) => {
        console.log('Here is the response status', res.status);
        
        if (res.status == 210) {
            return console.log('Would stay logged in/get localstorage info')
        }

        return console.log('Would have logged out')
    })

    .catch((err) => {
        console.log(err);
    })
}