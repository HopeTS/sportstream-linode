import axios from 'axios';

/**
 * Handles server login for User accounts
 * 
 * @param {{
 *      email: String,
 *      password: String
 * }} credentials account credentials
 * 
 * @returns {object | false} account information if successful, 
 *      else returns false
 */
export default (credentials) => {
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
    const user = axios.post('/login/user', {
        email: credentials.email,
        password: credentials.cpassword
    })

    .then((res) => {
        if (res.status === 202) {
            console.log('/login/user post successful. Returning', res.data);
            return res.data;
        }
    })

    .catch((error) => {
        console.log('something went wrong on /login/user endpoint');
        return false;
    });

    return user;
}