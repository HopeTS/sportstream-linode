import axios from 'axios';

/** Makes POST /user/connect-business */
export default (key) => {
    axios.post('/user/connect-business', 
        {key: key},
        {withCredentials: true}
    )

    .then((res) => {
        return true;
    })

    .catch((err) => {
        return false;
    })
}