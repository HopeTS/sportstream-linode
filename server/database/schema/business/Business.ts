import mongoose, { Schema } from 'mongoose';
import chalk from 'chalk';

import { businessType } from './types';


/**Account schema for business accounts */
const BusinessSchema: Schema<businessType> = new Schema({
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






export = BusinessSchema;