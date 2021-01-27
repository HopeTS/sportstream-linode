/**
 * Clears the user's cookies from the browser
 */
export const clear_cookies = () => {

    // Get the user cookie
    let userCookie;
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
        cookie = cookie.split('=');
        if (cookie[0] === 'user') {
            userCookie = cookie[1];
        }
    })
    if (!userCookie) return;

    // Clear the user cookie
    document.cookie = 'user' + '=;'
    return;
}