const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const generate_key = require('../../../utils/generate_key');
const { Stream, User, ConnectionPassword } = require('../Schema');
const { string } = require('prop-types');


/**
 * Account schema for business accounts
 * 
 * **name:** Name of the Business
 * 
 * **email:** Business email
 * 
 * **password:** Account password
 * 
 * **type:** Account type
 * 
 * **streams:** Business streams
 *      **upcoming:** Future streams
 *      **current:** Current streams
 *      **previous:** Previous streams
 * 
 * **connectionPasswords:** Unused connection ids
 * 
 * **connectedUsers:** List of connected User accounts
 */
const BusinessSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'business',
    },
    streams: {
        upcoming: {
            type: [String],
            default: []
        },
        current: {
            type: [String],
            default: []
        },
        previous: {
            type: [String],
            default: []
        }
    },
    connectionPasswords: {
        type: [String],
        default: []
    },
    connectedUsers: {
        type: [String],
        default: []
    }
});


/**
 * Adds a connection password
 * 
 * @param {*} cb callback function
 * 
 * @returns {String | false} The password if successful, else false
 */
BusinessSchema.methods.generate_connection_password = async function(cb) {
    try {

        // Generate connection password document
        let newConnectionPassword = new ConnectionPassword;
        newConnectionPassword.business = this._id;
        await newConnectionPassword.save();
        
        // Add to connectionPasswords
        this.connectionPasswords.push(newConnectionPassword._id);
        await this.save(cb);

        // Return password
        return newConnectionPassword.password
    }

    catch(e) {
        console.error(e);
        return false;
    }
}


/**
 * Getter for all connection passwords yet to be given or used
 * 
 * @param {*} cb callback function
 * 
 * @returns {[String] | false} Collection of passwords if successful, else false
 */
BusinessSchema.methods.get_available_connection_passwords = async function(cb) {
    try {

        // Get connection password docs
        const allConnectionPasswords = await Promise.all(
            this.connectionPasswords.map(
                async function(connectionPasswordId) {
                    return await mongoose.models['ConnectionPassword'].findOne(
                        {_id: connectionPasswordId},
                        async function(err, doc) {
                            if (err) throw err;
                            if (doc) return doc;
                            return null;
                        }
                    )
                }
            )
        )

        console.log('Here are all the connection passwords', 
            allConnectionPasswords
        )

        // Filter ungiven and unused connection passwords
        const availableConnectionPasswords = allConnectionPasswords.filter(
            (connectionPassword) => {
                return (
                    connectionPassword.given == false &&
                    connectionPassword.used == false
                );
            }
        )

        console.log('Here are all the available connection passwords',
            availableConnectionPasswords
        );

        return availableConnectionPasswords;
    }

    catch(e) {
        console.error(e);
        return false;
    }
}


/**
 * Adds a new upcoming stream to the business
 * 
 * @param {{
 *      field: String
 * }} streamData stream data
 * @param {*} cb callback function
 * 
 * @returns {{Stream} | false} stream object
 */
BusinessSchema.methods.create_stream = async function(streamData = {}, cb) {

    try {
        // Create the stream
        let stream = new Stream;
        let streamId = stream._id;
        stream.field = streamData.field ? streamData.field : 'New Stream';
        stream.business = this._id;
        await stream.save();

        // Add stream to upcoming streams
        console.log('Here is the new stream id', streamId);
        this.streams.upcoming.push(streamId);
        await this.save(cb);
        return stream;
    }

    catch(e) {
        console.error(e);
        return res.status(500).send();
    }
}


/**
 * Starts a given stream
 * 
 * @param {String} stream stream key
 * @param {*} cb callback function
 * 
 * @returns {object | false} business if stream started, else false
 */
BusinessSchema.methods.start_stream = async function(stream, cb) {
    // Validation
    if (!stream) return false;
    if (!this.streams.upcoming.includes(stream)) return false;
    
    // Get stream, set status to current
    const streamObject = await mongoose.models['Stream'].findOne(
        {_id: stream}, async function(err, doc) {
            if (err) throw err;
            if (doc) return doc;
            return false;
        }
    );
    console.log('[business] streamObject:', streamObject);
    if (!streamObject) return false;
    await streamObject.start_stream();

    // Move from 'upcoming' list to 'current' list
    const index = this.streams.upcoming.indexOf(stream);
    if (index !== -1) await this.streams.upcoming.splice(index, 1);
    await this.streams.current.push(stream);

    await this.save(cb);
    return this;
}


/**
 * Ends a given stream
 * 
 * @param {*} stream stream key
 * @param {*} cb callback function
 * 
 * @returns {object | false} business if stream started, else false
 */
BusinessSchema.methods.end_stream = async function(stream, cb) {
    // Validation
    if (!stream) return false;
    if (!this.streams.current.includes(stream)) return false;
    
    // Get stream, set status to previous
    const streamObject = await mongoose.models['Stream'].findOne(
        {_id: stream}, async function(err, doc) {
            if (err) throw err;
            if (doc) return doc;
            return false;
        }
    );
    console.log('[business] streamObject:', streamObject);
    if (!streamObject) return false;
    await streamObject.end_stream();

    // Move from 'upcoming' list to 'current' list
    const index = this.streams.current.indexOf(stream);
    if (index !== -1) await this.streams.current.splice(index, 1);
    await this.streams.previous.push(stream);

    console.log('[business] ended the stream', this);

    await this.save(cb);
    return this;
}


/**
 * Get all upcoming streams from the business. Returns stream objects.
 * 
 * @param {*} cb callback function
 * 
 * @returns {[String]} upcoming streams
 */
BusinessSchema.methods.get_upcoming_streams = async function(cb) {
    const upcomingStreams = await Promise.all(this.streams.upcoming.map(
        async function(stream) {
            return await mongoose.models['Stream'].findOne(
                {_id: stream},
                async function(err, doc) {
                    if (err) throw err;
                    if (doc) return doc;
                    return null;
                }  
            );
        }
    ));

    return upcomingStreams;
}


/**
 * Get all current streams from the business. Returns stream objects.
 * 
 * @param {*} cb callback function
 * 
 * @returns {[Stream]} current streams
 */
BusinessSchema.methods.get_current_streams = async function(cb) {
    const currentStreams = await Promise.all(this.streams.current.map(
        async function(stream) {
            return await mongoose.models['Stream'].findOne(
                {_id: stream},
                async function(err, doc) {
                    if (err) throw err;
                    if (doc) return doc;
                    return null;
                }  
            );
        }
    ));    
    
    return currentStreams;
}

/**
 * Get all previous streams from the business. Returns stream objects.
 * 
 * @param {*} cb callback function
 * 
 * @returns {[Stream]} previous streams
 */
BusinessSchema.methods.get_previous_streams = async function(cb) {
    const previousStreams = await Promise.all(this.streams.previous.map(
        async function(stream) {
            return await mongoose.models['Stream'].findOne(
                {_id: stream},
                async function(err, doc) {
                    if (err) throw err;
                    if (doc) return doc;
                    return null;
                }  
            );
        }
    ));    
    
    return previousStreams;
}

/**
 * Get Business information only available to the specific business
 * 
 * @param {*} cb callback function
 * 
 * @returns {object} personal doc
 */
BusinessSchema.methods.get_personal_doc = async function(cb) {
    let personalDoc= {};

    // Static data
    personalDoc.name = this.name;
    personalDoc.email = this.email;
    personalDoc.type = this.type;

    // Stream data
    const upcomingStreams = await this.get_upcoming_streams();
    const currentStreams = await this.get_current_streams();
    const previousStreams = await this.get_previous_streams();

    personalDoc.streams = {
        upcoming: upcomingStreams,
        current: currentStreams,
        previous: previousStreams
    };

    // Get User / connection data
    personalDoc.connection_ids = this.connection_ids;
    personalDoc.connected_users =  await this.get_connected_users();

    console.log('Here is the business personal doc', personalDoc);
    return personalDoc;
}

/**
 * Get all Stream data available to connected Users
 * 
 * @param {*} cb 
 * 
 * @returns {[{
 *       key: String,
 *       field: String
 * } | false]} Available data if successful else false
 */
BusinessSchema.methods.get_user_streams = async function(cb) {

    // Get raw data
    const rawStreams = await this.get_current_streams();
    
    // Clean data
    const userStreams = rawStreams.map((stream) => {

        // Validate
        if (!stream.status) return false;
        if (stream.status !== 'current') return false;
        
        return {
            key: stream.key,
            field: stream.field
        }
    });

    if (!userStreams) return false;
    console.log('business getuserstreams result', userStreams);
    return userStreams;
}

/**
 * Get business doc information only available to users connected to the
 * business
 * 
 * @param {*} id user id
 * @param {*} cb callback function
 * 
 * @returns {{
 *      name: String,
 *      type: String,
 *      streams: [String]
 * }} user doc
 */
BusinessSchema.methods.get_user_doc = async function(id=null, cb) {
    
    // Static fields
    let doc = {};
    doc.name = this.name;
    doc.type = this.type;

    // Get raw streams
    const rawStreams = await this.get_user_streams();
    console.log('businessuserdoc raw streams', rawStreams);
    doc.streams = rawStreams;

    return doc;
}

/**
 * Get docs of all connected users
 */
BusinessSchema.methods.get_connected_users = async function(cb) {
    console.log('get_connected_users called');    
    const users = await Promise.all(
        this.connectedUsers.map(async (user) => {
            console.log('Here is the user in get_connectedUsers', user);
            return await mongoose.models['User'].findOne(
                {_id: user}, async (err, doc) => {
                    if (err) throw err;
                    if (!doc) return false;
                    return await doc.get_business_doc();
                }
            )
        })
    );

    console.log('Here are the results of get_users', users);
    return users;
}

/**
 * Connect Business to User
 * 
 * @param {string} user User document ID
 * @param {*} cb callback function
 * 
 * @returns {Boolean} True if connection successful, else false
 */
BusinessSchema.methods.connect_user = async function(user=null, cb) {
    try {
        
        // Validation
        if (!user) throw new Error('There is no User ID');
        if (!mongoose.isValidObjectId(user)) throw new Error(
            "Given user is not a valid ID"
        );
        if (this.connectedUsers.includes(user)) throw new Error(
            "User is already connected to the Business"
        );

        // Create connection
        this.connectedUsers.push(user);
        await this.save(cb);
        return true;    
    }

    catch(e) {
        console.error(e);
        return false;
    }
}


/**
 * Disonnect user from business with given id
 * 
 * @param {string} id the user id
 * @param {*} cb callback function
 * 
 * @returns {boolean} true if connected to business, false if not
 */
BusinessSchema.methods.disconnect_user = async function(cb) {
    // TODO
}


/**
 * Handles password change
 * 
 * @param {*} cb callback function
 * 
 * @returns {boolean} true if successful, else false
 */
BusinessSchema.methods.change_password = async function(password="", cb) {
    try {
        // Validation
        if (!password) throw new Error('No password given');

        const hashedPassword = await bcrypt.hash(password, 10);
        this.password = hashedPassword;
        await this.save(cb);
        return true;
    }

    catch(e) {
        console.error(e);
        return false;
    }
}


BusinessSchema.pre('save', async function(next) {
    // First time setup
    if (this.isNew) {

        // Encrypt password
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }

    next();
});


/** Handle Business Account deletion */
BusinessSchema.pre('remove', async function(cb) {
    // TODO: Delete Connection Passwords
    // TODO: Delete Business from ConnectedBusinesses in Users
    // TODO: Delete Streams
});


module.exports = BusinessSchema;