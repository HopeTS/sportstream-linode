import axios from 'axios';

/**
 * Makes POST /business/generate-connection-id to generate a connection_id
 * for Business account
 * 
 * @returns {{
 *      connectionKey: String
 * }} connection id data
 */
export default (streamData) => {
    return axios.post('/business/generate-connection-id', {}, {
        withCredentials: true
    })

    .then((res) => {
        console.log('Here is generate connection id response', res.data)
        return res.data;
    })

    .catch((err) => {
        console.log(err);
        return false;
    });
}