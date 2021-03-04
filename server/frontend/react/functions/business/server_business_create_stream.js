import axios from 'axios';

/**
 * Makes POST /business/create-stream to create Business stream
 * 
 * @param {{
 *      field: String
 * }} streamData stream data
 * 
 * @returns {{
 *      _id: String,
 *      field: String,
 *      business: String,
 *      key: String
 * }} stream data
 */
export default (streamData) => {
    return axios.post('/business/create-stream', {
        stream: {
            field: streamData.field
        }
    }, {
        withCredentials: true
    })

    .then((res) => {
        console.log('Here is create stream response', res.data)
        return res.data;
    })

    .catch((err) => {
        console.log(err);
        return false;
    });
}