const mongoose = require('mongoose');

exports.User = mongoose.model('User', require('./UserSchema'));
exports.Business = mongoose.model('Business', require('./BusinessSchema'));