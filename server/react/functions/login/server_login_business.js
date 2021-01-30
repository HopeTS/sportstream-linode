import axios from 'axios';

/**
 * Handles server login for Business accounts
 * 
 * @param {{
 *      email: String,
 *      password: String
 * }} credentials account credentials
 * 
 * @returns {object | false} account information if successful, 
 *      else returns false
 */
export default (credentials)  => {
    // Required arguments
    if (!credentials.email || !credentials.password) {
        console.log('Invalid credentials');
        return false;
    }

    // Validate email
    if (
        !credentials.email.split('@').length === 2 ||
        !credentials.email.split('@')[1].split('.').length >= 2
    ) {
        console.log('Invalid email');
        return false;
    }

    // Send login post
    const business = axios.post('/login/business', {
        email: credentials.email,
        password: credentials.password
    })

    .then((res) => {
        console.log('Got business account')
        return res.data
    })

    .catch((error) => {
        console.log('something went wrong on /login/business endpoint');
        return false;
    });

    return business;
}