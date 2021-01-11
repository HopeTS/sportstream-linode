const User = require('../database/schema/Schema').User;
const Business = require('../database/schema/Schema').Business;

/**
 * Configure database for development
 */
const databaseConfig = async () => {
    // Test users
    const users = [{
        name: 'Test1',
        email: 'Test1@gmail.com',
        password: 'Test123',
        connected_businesses: []
    }, {
        name: 'Test2',
        email: 'Test2@gmail.com',
        password: 'Test123',
        connected_businesses: []
    }];

    const userConnection = {
        index: 1,
        business_password: ''
    }

    // Clear User collection
    await User.find({}, (err, docs) => {
        docs.forEach((doc) => {
            const id = doc._id
            User.findByIdAndDelete(id, (err) => {
                if (err) throw err;
            });
        });
    });

    // Add test users
    User.insertMany(users, (err, docs) => {
        if (err) throw err;
    })

    // Test businesses
    const businesses = [{
        name: 'Test business 1',
        username: 'Test_business',
        email: 'test@gmail.com',
        password: 'testing123',
        stream_key: [],
        connection_id: '',
        type: 'business'
    }, {
        name: 'Test business 2',
        username: 'Test_business2',
        email: 'test2@gmail.com',
        password: 'testing123',
        stream_key: [],
        connection_id: '',
        type: 'business'
    }]

    // Clear Business collection
    await Business.find({}, (err, docs) => {
        docs.forEach((doc) => {
            const id = doc._id;
            console.log('Here is the business before delete', doc)
            Business.findByIdAndDelete(id, (err) => {
                if (err) throw err;
            });
        });
    });

    // Add test businesses
    Business.insertMany(businesses, (err, docs) => {
        if (err) throw err;
    });
}

module.exports = databaseConfig;