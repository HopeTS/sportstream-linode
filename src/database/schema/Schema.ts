/*
 *  Master schema file, wires up all document schema
 */

 
/* External packages */
const mongoose = require('mongoose');


/* Schema */
exports.User = mongoose.model('User', require('./UserSchema'));
