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
    await businesses.map(async (business) => {
        let newBusiness = new Business;
        newBusiness.name = business.name;
        newBusiness.email = business.email;
        newBusiness.password = business.password;
        await newBusiness.save();
    });

    await User.find({}, async (err, docs) => {
        await Promise.all(docs.map(async (doc) => {
            console.log('[config] Here is a new saved user', doc);
        }));
    });

    await Business.find({}, async (err, docs) => {
        await Promise.all(docs.map(async (doc) => {
            console.log('[config] Here is a new saved business', doc);
        }));
    });

    // Get connection id for user to business connection
    let connectBusiness = await Business.findOne({}, async (err, business) => {
        if (err) throw err;
        await business.generate_connection_id();

        console.log('[config] business after connection generated', business);
        return business;
    })

    // connect user to business
    let connectUser = await User.findOne({}, async function(err, user) {
        if (err) throw err;
        await user.connect_business(business.connection_ids[0]);
        return user;
    });
    
    const business_ids = await Business.find({}, async (err, docs) => {
        let ids = await Promise.all(docs.map(async (doc) => {
            return doc._id;
        }));

        return ids;
    });

    console.log('[config] Here are the business ids', business_ids);

    const user_ids = await User.find({}, async (err, docs) => {
        let ids = await Promise.all(docs.map(async (doc) => {
            return doc._id;
        }));

        return ids;
    });
    
    console.log('[config] Here are the user ids', user_ids);

    // dont connect user to business
}

module.exports = databaseConfig;