"use strict";
const generate_key = (length = 12) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let keyArray = [];
    for (let i = 0; i < length; i++) {
        keyArray.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }
    return keyArray.join('');
};
module.exports = generate_key;
//# sourceMappingURL=generate_key.js.map