import mongoose, { Schema, Model, model } from 'mongoose';
import chalk from 'chalk';
import {
    IStream, IStreamBusinessDocument, IStreamUserDocument, IStreamModel
} from './types';

import generate_key from '../../../utils/generate_key';


const StreamSchema: Schema = new Schema({
    field: {
        type: String,
        required: true
    },
    business: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['upcoming', 'current', 'previous'],
        default: 'upcoming'
    },
    key: {
        type: String,
        default: ''
    }
});


/** Generate stream key */
StreamSchema.statics.generate_key = async function(): Promise<string> {

    let unique = false;
    const keyLength = Math.floor(Math.random() * 4) + 8;
    let streamKey = '';

    // Generate unique key
    while (!unique) {
        streamKey = generate_key(keyLength);

        // Ensure key is unique
        await mongoose.models['Stream'].findOne(
            {key: streamKey},
            async function(err, stream) {
                if (err) throw err;
                if  (!stream) unique = true;
            }
        );
    }

    return streamKey;
}


/** Get stream (information available to connected Users) */
StreamSchema.methods.get_user_doc = function(cb): IStreamUserDocument {
    return {
        field: this.field,
        key: this.key
    };
};


/** Get stream (information available to Business owner) */
StreamSchema.methods.get_business_doc = function(cb): IStreamBusinessDocument {
    return {
        field: this.field,
        key: this.key  
    };
};


/** Sets stream status to current */
 StreamSchema.methods.start_stream = async function(cb): Promise<void> {
    this.status = 'current';
    await this.save(cb);
    return;
}


/** Sets stream status to previous */
StreamSchema.methods.end_stream = async function(cb): Promise<void> {
    this.status = 'previous';
    await this.save(cb);
    return;
}


StreamSchema.pre('save', async function(this: IStream, next) {

    // First time configuration
    if (this.isNew) {

        // generate streamKey
        const key = await Stream.generate_key();
        this.key = key;
    }

    next();
});


/** Stream model */
const Stream: IStreamModel = model<IStream, IStreamModel>('Stream', StreamSchema);


export = Stream;