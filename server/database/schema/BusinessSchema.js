const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Stream, User } = require('./Schema');


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
 * **connection_ids:** Unused connection ids
 * 
 * **connected_users:** List of connected User accounts
 */
const BusinessSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    streams: {
        upcoming: {
            type: [String]
        },
        current: {
            type: [String]
        },
        previous: {
            type: [String]
        }
    },
    connection_ids: {
        type: [String],
        required: true
    },
    connected_users: {
        type: [String]
    }
});


/**
 * Adds a connection_id
 * 
 * @param {*} cb callback function
 */
BusinessSchema.methods.generate_connection_id = async function(cb) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let unique = false;   // Whether or not streamKey is shared by other businesses
    let connectionIdArray = [];
    let connectionId;

    while (!unique) {
        // Generate the key
        for ( var i = 0; i < 12; i++ ) {
            connectionIdArray.push(
                characters.charAt(Math.floor(Math.random() * characters.length))
            );
        }
        connectionId = connectionIdArray.join('');

        // Ensure key is unique
        await mongoose.models['Business'].findOne(
            {connection_id: {"$in": [connectionId]}},
            async function(err, user) {
                if (err) throw err;
                if (!user) unique = true;
            }
        );    
    }

    await this.connection_ids.push(connectionId);
    await this.save(cb);
    return;
}


/**
 * Adds a new upcoming stream to the business
 * 
 * @param {*} streamData stream data
 * @param {*} cb callback function
 */
BusinessSchema.methods.create_stream = async function(streamData = {}, cb) {

    // Create the stream
    let stream = new Stream;
    let streamId = stream._id;
    stream.field = streamData.field ? streamData.field : 'New Stream';
    stream.business = this._id;
    stream.key = stream.generate_key();
    stream.status = 'upcoming';
    await stream.save();

    // Add stream to upcoming streams
    console.log('Here is the new stream id', streamId);
    this.streams.upcoming.push(streamId);
    await this.save(cb);
    return this;
}


/**
 * Starts a given stream
 * 
 * @param {*} stream stream key
 * @param {*} cb callback function
 * 
 * @returns {boolean} true if stream started, else false
 */
BusinessSchema.methods.start_stream = async function(stream, cb) {
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

    console.log('[business] started the stream', this);

    await this.save(cb);
    return true;
}


/**
 * Ends a given stream
 * 
 * @param {*} stream stream key
 * @param {*} cb callback function
 * 
 * @returns {boolean} true if stream started, else false
 */
BusinessSchema.methods.end_stream = async function(stream, cb) {
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
    return true;
}


/**
 * Get all upcoming streams from the business. Returns stream objects.
 * 
 * @param {*} cb callback function
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
 * Get business doc information only available to users connected to the
 * business
 * 
 * @param {*} id user id
 * @param {*} cb callback function
 */
BusinessSchema.methods.get_user_doc = async function(id=null, cb) {
    const doc = {
        name: this.name,
        type: this.type,
        streams: this.streams.current
    }
    return doc;
}


/**
 * Connect business to a user with given id
 * 
 * @param {string} id the user id
 * @param {*} cb callback function
 * 
 * @returns {boolean} true if connected to business, false if not
 */
BusinessSchema.methods.connect_user = async function(id=null, cb) {
    if (!id) return false;
    if (this.connected_users.includes(id)) return false;
    if (!mongoose.isValidObjectId(id)) {
        return false;
    }
    
    this.connected_users.push(id);
    await this.save(cb);

    return true;
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


/* Hooks */
BusinessSchema.pre('save', async function(done) {
    if (this.isNew) {
        this.streams = {
            upcoming: [],
            current: [],
            previous: []
        };
        this.connection_ids = [];
        this.connected_users = [];
        this.type = 'business';
    } 
});

module.exports = BusinessSchema;