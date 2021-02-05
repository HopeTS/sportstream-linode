/**
 * Validate name
 * 
 * @param {String} name name
 * 
 * @returns {boolean} true if valid else false
 */
export default (name) => {
    if (!name || name.length === 0) return false;
    else return true;
}