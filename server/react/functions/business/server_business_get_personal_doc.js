import axios from 'axios';

/**
 * Makes GET /business/get-personal-doc for Business information of logged
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
    return axios.get(
        '/business/get-personal-doc', {withCredentials: true}
    )

    // Clean data
    .then((res) => {
        return {
            connected_users: res.data.connected_users,
            connection_ids: res.data.connection_ids,
            email: res.data.email,
            name: res.data.name,
            streams: {
                upcoming: res.data.streams.upcoming,
                current: res.data.streams.current,
                previous: res.data.streams.previous
            },
            type: res.data.type
        }
    })

    .catch((err) => {
        console.log(err);
        return false;
    })
}