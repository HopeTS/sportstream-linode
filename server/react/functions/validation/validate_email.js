/**
 * Validate email
 * 
 * @param {String} email email
 * 
 * @returns {true | string} true if valid else error message
 */
export default (email) => {
    if (!email || email.length === 0) return 'Empty email.';

    if (
        !email.split('@').length === 2 ||
        !email.split('@')[1].split('.').length >= 2
    ) {
        return 'Invalid email.'
    }

    return true;
}