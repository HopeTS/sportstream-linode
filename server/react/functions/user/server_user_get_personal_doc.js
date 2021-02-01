import axios from 'axios';

/**
 * Makes GET /user/get-personal-doc for User information of logged in User
 * 
 * @returns {{
 *  
 * } | false} Personal doc if successful, else false
 */
export default () => {
    
    // Get raw data
    return axios.get(
        '/user/get-personal-doc', {withCredentials: true}
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