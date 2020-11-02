const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    business: Schema.Types.ObjectId,
});

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

UserSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = UserSchema;