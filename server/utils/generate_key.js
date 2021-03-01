
/**
 * Generate random string key
 * 
 * @param {Number} length length of string
 * 
 * @returns {String} randomly generated key
 */
const generate_key = (length = 12) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let keyArray = [];

    for (let i=0; i<length; i++) {
        keyArray.push(
            characters.charAt(Math.floor(Math.random() * characters.length))
        );
    }

    return keyArray.join('');
}

module.exports = generate_key;