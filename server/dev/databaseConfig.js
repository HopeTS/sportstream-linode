const bcrypt = require('bcryptjs');

const User = require('../database/schema/Schema').User;
const Business = require('../database/schema/Schema').Business;
const Stream = require('../database/schema/Schema').Stream;

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
    await Promise.all(businesses.map(async (business) => {
        let newBusiness = new Business;
        newBusiness.name = business.name;
        newBusiness.email = business.email;
        newBusiness.password = business.password;
        await newBusiness.save();
        return newBusiness;
    }));

    let connectBusinessId;
    // Get connection id for user to business connection
    let connectBusiness = await Business.findOne({}, async (err, business) => {
        if (err) throw err;
        if (!business) return console.log('[config] business not found?!')
        await business.generate_connection_id();
        await business.save();
        connectBusinessId = business.connection_ids[0]

        console.log('[config] business after connection generated', business);
        return business;
    });

    const user_ids = await User.find({}, async (err, docs) => {
        let ids = await Promise.all(docs.map(async (doc) => {
            return doc._id;
        }));

        return ids;
    });

    const business_ids = await Business.find({}, async (err, docs) => {
        let ids = await Promise.all(docs.map(async (doc) => {
            return doc._id;
        }));

        return ids;
    });
    
    await user_ids[0].connect_business(business_ids[0].connection_ids[0]);
    await user_ids[1].connect_business(business_ids[1].connection_ids[0]);

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
    const user1 = await User.findOne(
        {_id: user_ids[0]._id}, 
        async function(err, doc) {
            if (err) throw err;
            if (doc) return doc;
            return false;
        }
    );
    const user2 = await User.findOne(
        {_id: user_ids[1]._id}, 
        async function(err, doc) {
            if (err) throw err;
            if (doc) return doc;
            return false;
        }
    );

    const business1 = await Business.findOne(
        {_id: business_ids[0]._id}, 
        async function(err, doc) {
            if (err) throw err;
            if (doc) return doc;
            return false;
        }
    );
    const business2 = await Business.findOne(
        {_id: business_ids[1]._id}, 
        async function(err, doc) {
            if (err) throw err;
            if (doc) return doc;
            return false;
        }
    );

    console.log('user1', user1);
    console.log('user2', user2);
    console.log('business1', business1);
    console.log('business2', business2);

    // Test business start stream and user get available streams
    await business1.create_stream({
        field: 'Test field 1
    });

    console.log('Here is business1 after stream', business1);

    console.log(await user1.get_connected_businesses());
}

module.exports = databaseConfig;