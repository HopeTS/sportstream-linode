import axios from 'axios';

/**
 * Handles server login for Business accounts
 * 
 * @param {{
 *      email: String,
 *      password: String
 * }} credentials account credentials
 * 
 * @returns {object | string} account information if successful, 
 *      else returns error message
 */
export default (credentials)  => {

    // Send login post
    return axios.post('/login/business', {
        email: credentials.email,
        password: credentials.password
    })

    // Handle response
    .then((res) => {
        if (res.status === 202) return res.data;

        // Unhandled/ unpredictable error
        console.warn(
            'The /login/business endpoint did not throw an error \
            but did not return a proper status code...'
        );
        return 'Something went wrong on our end. Try again in a few minutes.';
    })

    // Error handling
    .catch((error) => {
        if (error.response.status === 404) return 'Invalid email or password';
        if (error.response.status === 500) {
            return 'Something went wrong on our end. try again in a few minutes.';
        }
        
        // Unknown error
        return 'Something went wrong on our end. try again in a few minutes.';
    });
}