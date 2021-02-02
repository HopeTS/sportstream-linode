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
    const account = axios({
        method: "post",
        data: {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            business_password: credentials.business_password
        },
        withCredentials: true,
        url: `${window.location.origin}/register/user`
    })

    .then((res) => {

        // If successful
        if (res.status === 201) {
            console.log('user registered in server, returning user');
            console.log('user register res.data', res.data);

            const newAccount = {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            }
            return newAccount;
        }
    })

    .catch((error) => {
        console.log('register user error', error);
        return false;
    });
    return account;
}