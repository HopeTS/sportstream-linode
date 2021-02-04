import axios from 'axios';
import { convertToObject } from 'typescript';

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
    // Required arguments
    if (!credentials.email || !credentials.password) {
        return 'Empty email or password';
    }

    // Validate email
    if (
        !credentials.email.split('@').length === 2 ||
        !credentials.email.split('@')[1].split('.').length >= 2
    ) {
        return 'Invalid email';
    }

    // Send login post
    const business = axios.post('/login/business', {
        email: credentials.email,
        password: credentials.password
    })

    .then((res) => {
        if (res.status === 202) return res.data;
        console.warn(
            'The /login/business endpoint did not throw an error \
            but did not return a proper status code...'
        )
        return 'Something went wrong on our end. Try again in a few minutes.';
    })

    .catch((error) => {
        if (error.status === 404) console.log('Errors thrown as expected');
        console.warn('/login/business endpoint has thrown an error...');
        return 'Something went wrong on our end. try again in a few minutes.';
    });

    return business;
}