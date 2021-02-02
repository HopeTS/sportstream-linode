/*
 *  Configure database for development environment and run some basic tests 
 */

const bcrypt = require('bcryptjs');
const chalk = require('chalk');

const User = require('../database/schema/Schema').User;
const Business = require('../database/schema/Schema').Business;
const Stream = require('../database/schema/Schema').Stream;

/**
 * Configure database for development
 */
async function devDatabaseConfig() {
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
    }, {
        name: 'Test3',
        email: 'user3@gmail.com',
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
    await users.map(async (user) => {
        let newUser = new User;
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = user.password;
        newUser.type = 'user';
        await newUser.save(); 
    });

    // Test businesses
    const businesses = [{
        name: 'Test business 1',
        email: 'business@gmail.com',
        password: await bcrypt.hash('1234', 10),
    }, {
        name: 'Test business 2',
        email: 'business2@gmail.com',
        password: await bcrypt.hash('1234', 10),
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
    try {
        await Promise.all(businesses.map(async (business) => {
            let newBusiness = new Business;
            newBusiness.name = business.name;
            newBusiness.email = business.email;
            newBusiness.password = business.password;
            await newBusiness.save();
            return newBusiness;
        }));
    }

    catch(e) {
        console.log('Error adding businesses');
        return false;
    }

    // Get User/Business IDs
    let user_ids;
    let business_ids;
    try {
        user_ids = await User.find({}, async (err, docs) => {
            let ids = await Promise.all(docs.map(async (doc) => {
                return doc;
            }));
    
            return ids;
        });
    
        business_ids = await Business.find({}, async (err, docs) => {
            let ids = await Promise.all(docs.map(async (doc) => {
                return doc;
            }));
    
            return ids;
        });
    }

    catch(e) {
        console.log(chalk.red('Error finding accounts'));
        return false;
    }

    // Generate business Connection IDs
    let connectionKey1;
    let connectionKey2;
    try {
        connectionKey1 = await business_ids[0].generate_connection_id();
        connectionKey2 = await business_ids[1].generate_connection_id();
    }

    catch(e) {
        console.error(e)
    }
    
    // Connect businesses
    try {
        await user_ids[0].connect_business(business_ids[0].connection_ids[0]);
        await user_ids[1].connect_business(business_ids[1].connection_ids[0]);    
    }

    catch(e) {
        console.log(chalk.red('Error connecting businesses'));
        return false;
    }

    console.log('[config] users after connection:');
    await User.find({}, async (err, docs) => {
        if (err) throw err;
        if (docs) console.log('user docs', docs)
    })

    await Business.find({}, async (err, docs) => {
        if (err) throw err;
        if (docs) console.log('business docs', docs)
    })

    // Get user and business docs
    let user1 = await User.findOne(
        {_id: user_ids[0]._id}, 
        async function(err, doc) {
            if (err) throw err;
            if (doc) return doc;
            return false;
        }
    );
    let user2 = await User.findOne(
        {_id: user_ids[1]._id}, 
        async function(err, doc) {
            if (err) throw err;
            if (doc) return doc;
            return false;
        }
    );

    let business1 = await Business.findOne(
        {_id: business_ids[0]._id}, 
        async function(err, doc) {
            if (err) throw err;
            if (doc) return doc;
            return false;
        }
    );
    let business2 = await Business.findOne(
        {_id: business_ids[1]._id}, 
        async function(err, doc) {
            if (err) throw err;
            if (doc) return doc;
            return false;
        }
    );

    // Test business start stream and user get available streams
    await business1.create_stream({
        field: 'Test field 1'
    });

    business1 = await Business.findOne(
        {_id: business1._id},
        async function(err, doc) {
            if (err) throw err;
            if (doc) return doc;
            return false;
        }
    );
    console.log('Here is business1 after stream', business1);

    let userDocs = await user1.get_connected_businesses();
    console.log('userDocs before start stream', userDocs);

    await business1.start_stream(business1.streams.upcoming[0]);

    userDocs = await user1.get_connected_businesses();
    console.log('userDocs after start stream', userDocs);

    await business1.end_stream(business1.streams.current[0]);

    userDocs = await user1.get_connected_businesses();
    console.log('userDocs after end stream', userDocs);

    const busGetConnectedUsers = await business1.get_connected_users();
    console.log('Business get_connected_users', busGetConnectedUsers);

    return true;
}

module.exports = devDatabaseConfig;