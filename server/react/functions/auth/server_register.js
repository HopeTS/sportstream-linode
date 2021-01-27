import axios from 'axios';

/**
 * Handles server register for User accounts
 * 
 * @param {*} credentials accoount credentials
 * 
 * @returns {object | false} account info if registration successful, else false
 */
export const server_register_user = (credentials) => {
    // TODO
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

/**
 * Handles server register for Business accounts
 * 
 * @param {*} credentials accoount credentials
 * 
 * @returns {object | false} account info if registration successful, else false
 */
export const server_register_business = (credentials) => {
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

        return false;
    })

    .catch((error) => {
        console.log('register business error', error);
        return false;
    });
    return account;
}