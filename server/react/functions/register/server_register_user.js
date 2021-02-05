import axios from 'axios';

/**
 * Handles server register for User accounts
 * 
 * @param {{
 *      name: String,
 *      email: String,
 *      password: String
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
            password: credentials.password
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

    // Error handling
    .catch((error) => {
        switch (error.response.status) {
            case 460:
                return 'Email already registered as a User';

            case 461:
                return 'Email already registered as a Business';

            default:
                return 'Something went wrong on our end. Try again in a few \
                minutes';
        }
    });
}