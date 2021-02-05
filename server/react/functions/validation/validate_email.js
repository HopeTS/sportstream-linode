/**
 * Validate email
 * 
 * @param {String} email email
 * 
 * @returns {boolean} true if valid false
 */
export default (email) => {
    if (!email || email.length === 0) return false;
    else if (!(email.split('@').length === 2)) return false;
    else if (!(email.split('@')[1].split('.').length >= 2)) return false;

    else return true;
}