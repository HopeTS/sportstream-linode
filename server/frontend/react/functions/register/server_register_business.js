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
 * } | string} account info if registration successful, else error message
 */
export default (credentials) => {
    return axios.post('/register/business',
        {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            business_key: credentials.business_key
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
        return 'Something went wrong on our end. Refresh and try again.';
    })

    // Error handling
    .catch((error) => {
        console.log(error);
        switch (error.response.status) {
            case 460:
                return 'Email already registered as a User';

            case 461:
                return 'Email already registered as a Business';

            case 462:
                return 'Incorrect Business Key';

            default:
                return 'Something went wrong on our end. Try again in a few \
                minutes';
        }
    });
}