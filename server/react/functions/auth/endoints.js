import axios from 'axios';

/**
 * Handles server login for User accounts
 * 
 * @param {*} email email address
 * @param {*} password password
 * 
 * @returns {object | false} account information if successful, 
 *      else returns false
 */
export const server_login_user = (email, password) => {
    // Required arguments
    if (!email || !password) {
        console.log('Invalid credentials');
        return false;
    }

    // Validate email
     if (
        !email.split('@').length === 2 ||
        !email.split('@')[1].split('.').length >= 2
    ) {
        console.log('Invalid email');
        return false;
    }

    // Send login post
    const res = axios.post('/login/user', {
        email: email,
        password: password
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

    return res;
}

/**
 * Handles server login for Business accounts
 * 
 * @param {*} email email address
 * @param {*} password password
 * 
 * @returns {object | false} account information if successful, 
 *      else returns false
 */
export const server_login_business = (email, password)  => {
    // Required arguments
    if (!email || !password) {
        console.log('Invalid credentials');
        return false;
    }

    // Validate email
    if (
        !email.split('@').length === 2 ||
        !email.split('@')[1].split('.').length >= 2
    ) {
        console.log('Invalid email');
        return false;
    }

    // Send login post
    axios.post('/login/business', {
        email: email,
        password: password
    })

    .then((res) => {
        console.log('Got business account')
        return res.data
    })

    .catch((error) => {
        console.log('something went wrong on /login/business endpoint');
    })
}

export const server_logout = () => {

}