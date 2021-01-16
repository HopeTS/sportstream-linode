const bcrypt = require('bcryptjs');

const User = require('../database/schema/Schema').User;
const Business = require('../database/schema/Schema').Business;

/**
 * Configure database for development
 */
const databaseConfig = async () => {
    // Test users
    const users = [{
        name: 'Test1',
        email: 'user@gmail.com',
        password: await bcrypt.hash('1234', 10),
        connected_businesses: []
    }, {
        name: 'Test2',
        email: 'user2@gmail.com',
        password: await bcrypt.hash('1234', 10),
        connected_businesses: []
    }];

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
        email: 'business@gmail.com',
        password: await bcrypt.hash('1234', 10),
        stream_key: [],
        connection_id: '',
        type: 'business'
    }, {
        name: 'Test business 2',
        username: 'Test_business2',
        email: 'business2@gmail.com',
        password: await bcrypt.hash('1234', 10),
        stream_key: [],
        connection_id: '',
       type: 'business'
    }];

    // Clear Business collection
    await Business.find({}, (err, docs) => {
        docs.forEach((doc) => {
            const id = doc._id;
            Business.findByIdAndDelete(id, (err) => {
                if (err) throw err;
            });
        });
    });

    // Add test businesses
    for (var i=0; i<businesses.length; i++) {
        let newBusiness = new Business({...businesses[i]});
        const result = await newBusiness.save();
    }

    let user_connection;

    // Get connection id for user to business connection
    await Business.findOne({}, (err, user) => {
        user_connection = user.connection_id;
    })

    // connect user to business
    await User.findOne({}, async function(err, user) {
        if (err) throw err;
        await user.connectToBusiness(user_connection);
    });

    let bus_id;

    setTimeout(async function() {
        await User.find({}, (err, docs) => {
            if (err) throw err;
            for (var i=0; i<docs.length; i++) {
                if (docs[i].connected_businesses.length === 1) {
                    bus_id = docs[i].connected_businesses[0];
                }
            }
        });

        Business.findOne({_id: bus_id}, async function(err, doc) {
            if (err) throw err;

            if (doc) {
                await doc.generateConnectionId();    
            }
        })
    }, 3000)

    // dont connect user to business
}

module.exports = databaseConfig;