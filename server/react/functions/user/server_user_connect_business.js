import axios from 'axios';

/** Makes POST /user/connect-business */
export default (key) => {
    return axios.post('/user/connect-business', 
        {key: key},
        {withCredentials: true}
    )

    .then((res) => {
        console.log('userconnectbusiness fef res', res)
        return true;
    })

    .catch((err) => {
        return false;
    })
}