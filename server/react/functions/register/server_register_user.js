import axios from 'axios';

/**
 * Handles server register for User accounts
 * 
 * @param {{
 *      name: String,
 *      email: String,
 *      password: String,
 *      business_password: String
 * }} credentials accoount credentials
 * 
 * @returns {{
 *      name: String,
 *      email: String,
 *      password: String
 * } | false} account info if registration successful, else false
 */
export default (credentials) => {
    return axios.post('/register/user', 
        {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            business_password: credentials.business_password
        },
        {withCredentials: true}
    )

    .then((res) => {

        // If successful
        if (res.status === 201) {
            const newAccount = {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            }
            return newAccount;
        }

        // This should never happen
        return 'Something went wrong on our end. Please try again';
    })

    .catch((error) => {

        // Business already exists
        if (error.response.status === 460) {
            return 'Email already registered as a Business!';
        }

        // User already exists
        else if (error.response.status === 461) {
            return 'Email already registered as a User!';
        }

        // Some other error
        return 'Something has gone wrong on our end. Refresh and try again.';
    });
}