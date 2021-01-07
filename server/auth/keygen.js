const { User, Business } = require('../database/schema/Schema');

/**
 * Generate stream key
 * 
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

/**
 * Generate connection ID
 * 
 * @param {string} length length of the stream key
 * 
 * @returns string
 */
const generateConnectionID = (length=8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let connectionIDArray = [];
    let validID = false;
    let connectionID = '';

    // Generate connection ID strings until a valid unique one is found.
    while (!validID) {

        // Generate random key
        for ( var i = 0; i < length; i++ ) {
            connectionIDArray.push(
                characters.charAt(Math.floor(Math.random() * characters.length))
            );
        }
        connectionID = connectionIDArray.join('');

        // Test against Business database
        Business.findOne({connection_id: connectionID}, async (err, doc) => {
            if (err) throw err;
            else if (!doc) {
                console.log('Unique connection id found');
                validID = true;
            } else {
                'This ID is not unique'
            }
        });
    }

    return connectionID;
}

exports.generateStreamKey = generateStreamKey;
exports.generateConnectionID = generateConnectionID;
