/**
 * Generate stream key
 * @param {number} length length of the stream key
 *
 * @returns String
 */
const generateStreamKey = (length=12) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let streamKeyArray = [];

    for ( var i = 0; i < length; i++ ) {
        streamKeyArray.push(
            characters.charAt(Math.floor(Math.random() * characters.length))
        );
    }

    return streamKeyArray.join('');
}

exports.generateStreamKey = generateStreamKey;