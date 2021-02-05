import axios from 'axios';

/**
 * Log account out on the server. 
 * 
 * @returns {boolean} true if successful, else false
 */
export default () => {
    axios.get('/logout')

    .then((res) => {
        return true;
    })
    
    .catch((error) => {
        return false;
    })
}