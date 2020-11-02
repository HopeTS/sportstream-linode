const mongoose = require('mongoose');
const bcrypt = require('bcrypts-nodejs');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

BusinessSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

BusinessSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = BusinessSchema;