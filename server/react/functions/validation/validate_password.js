/**
 * Validate password
 * 
 * @param {String} password password
 * 
 * @returns {true | string} true if valid else error message
 */
export default (password) => {
    if (!password || password.length === 0) return 'Empty password.';

    if (password.length <= 9) {
        return 'Your password must be at least 10 characters long.';
    }

    return true;
}