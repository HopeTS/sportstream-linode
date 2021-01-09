const User = require('../database/schema/Schema').User;
const Business = require('../database/schema/Schema').Business;

/**
 * Configure database for development
 */
const databaseConfig = async () => {
    // Clear database
    await User.find({}, (err, docs) => {
        docs.forEach((doc) => {
            const id = doc._id
            User.findByIdAndDelete(id, (err) => {
                if (err) throw err;
            });
        });
    });
    await Business.find({}, (err, docs) => {
        docs.forEach((doc) => {
            const id = doc._id;
            Business.findByIdAndDelete(id, (err) => {
                if (err) throw err;
            });
        });
    });


    // TODO: Add 2 businesses
    // TODO: Add 2 users
    // TODO: Connect 1 user to a business
    /* users.forEach((user) => {
        console.log('Here is the user')
        console.log(user)
    }); */
}

module.exports = databaseConfig;