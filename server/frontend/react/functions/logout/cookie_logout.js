import axios from 'axios';

export default () => {

    // Get the user cookie
    let userCookie;
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
        cookie = cookie.split('=');
        if (cookie[0] === 'user') {
            userCookie = cookie[1];
        }
    })

    // Clear the user cookie
    document.cookie = 'user' + '=;'
    return;
}