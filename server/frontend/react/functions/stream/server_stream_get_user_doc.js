import axios from 'axios';

/**
 * Makes POST /stream/get-user-doc request for Stream with given id
 * 
 * @param {{
 *      id: String
 * }} streamData stream data
 * 
 * @returns {{
 *      field: String,
 *      key: String
 * } | false} User doc if successful, else false
 */
export default (stream) => {
    return axios.post(
        '/stream/get-user-doc', 
        {stream}, 
        {withCredentials: true}
    )

    .then((res) => {
        console.log('stramgetuserdoc endpoint res', res.data);
        return res.data;
    })

    .catch((error) => {
        console.error(error);
        return false;
    })
}