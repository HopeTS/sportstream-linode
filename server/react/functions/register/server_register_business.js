import axios from 'axios';

/**
 * Handles server register for Business accounts
 * 
 * @param {{
 *      name: String,
 *      email: String,,
 *      password: String,
 *      business_key: String
 * }} credentials accoount credentials
 * 
 * @returns {{
 *      name: String,
 *      email: String,
 *      password: String
 * } | false} account info if registration successful, else false
 */
export default (credentials) => {
    const account = axios({
        method: "post",
        data: {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            business_key: credentials.business_key
        },
        withCredentials: true,
        url: `${window.location.origin}/register/business`
    })

    .then((res) => {

        // If successful
        if (res.status === 201) {
            console.log('business registered in server, returning business');
            console.log('business register res.data', res.data);
            
            // Return credentials
            const newAccount = {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            }
            return newAccount;
        }

        if (res.status === 460) {
            console.log('460 caught in then')
        }

        return false;
    })

    .catch((error) => {
        console.log('register business error', error.response.status);
        return false;
    });
    return account;
}