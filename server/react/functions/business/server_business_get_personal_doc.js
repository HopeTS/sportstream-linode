import axios from 'axios';

/**
 * Makes GET /business/get-personal-doc for business information of logged
 * in Business
 * 
 * @returns {{
 *      connected_users: [String],
 *      connection_ids: [String],
 *      email: String,
 *      name: String,
 *      type: String,
 *      streams: {
 *          upcoming: [Stream],
 *          current: [Stream],
 *          previous: [Stream]
 *      }
 * }}
 */
export default () => {

    // Get raw data
    const rawData = axios.get(
        '/business/get-personal-doc', {withCredentials: true}
    )
    .then((res) => {
        console.log('get-personal-doc response', res);
        return res;
    })
    .catch((err) => {
        console.log(err);
        return false;
    })

    // Clean data
    const personalDoc = {
        connected_users: rawData.connected_users,
        connection_ids: rawData.connection_ids,
        email: rawData.email,
        name: rawData.name,
        streams: {
            upcoming: rawData.streams.upcoming,
            current: rawData.streams.current,
            previous: rawData.streams.previous
        },
        type: rawData.type
    }

    return personalDoc;
}