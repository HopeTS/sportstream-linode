/**
 * Validate password
 * 
 * @param {String} password password
 * 
 * @returns {boolean} true if valid else false
 */
export default (password) => {
    if (!password || password.length === 0) return false;
    else if (password.length <= 9) return false;

    else return true;
}