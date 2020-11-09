const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    stream_key: String,
    business: Schema.Types.ObjectId,
});

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateStreamKey = () => {
    return shortid.generate();
}

module.exports = UserSchema;